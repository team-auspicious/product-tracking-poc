const estraverse = require("estraverse");
const fs = require("fs");
const path = require("path");
const graph = new Map();

class AstTester {
  trackingList = [];
  constructor(trackingList) {
    this.trackingList = trackingList;
  }

  isExcluded(resourceName) {
    return resourceName.includes("node_modules");
  }

  apply(compiler) {
    console.log("AstTester Applied");

    compiler.hooks.normalModuleFactory.tap("AstTester", (factory) => {
      factory.hooks.parser
        .for("javascript/auto")
        .tap("AstParser", (parser, options) => {
          parser.hooks.program.tap("AstTester", (ast, comments) => {
            const resourceName = parser?.state?.module?.resource;

            if (this.isExcluded(resourceName)) {
              return;
            }

            const isValidExpresssion = (node, parent) => {
              return (
                node.type == "Identifier" && parent.type === "CallExpression"
              );
            };

            const isTrackingComponent = (nodeName) => {
              return this.trackingList.includes(nodeName);
            };

            const addGraph = (source, target) => {
              if (graph.has(source)) {
                const node = graph.get(source);
                node.push(target);
                return;
              }
              graph.set(source, [target]);
            };

            estraverse.traverse(ast, {
              enter: function (node, parent) {
                if (
                  isValidExpresssion(node, parent) &&
                  isTrackingComponent(node.name)
                ) {
                  addGraph(resourceName, node.name);
                }
              },
            });

            const output = {};
            for (const [key, value] of graph) {
              for (const v of value) {
                console.log(`${path.basename(key)} -> ${v}`);
              }
              output[path.basename(key)] = value.map((v) => v);
            }

            fs.writeFileSync(
              "component-graph.json",
              JSON.stringify(output, null, 2),
            );
          });
        });
    });
  }
}

module.exports = AstTester;
