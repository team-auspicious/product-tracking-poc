
# Component Tracking Library POC

### 한계점

- module graph를 그리기 위해서 추적해야할 컴포넌트의 확장자가 tsx 파일이어야만 한다
- 한 파일에는 하나의 컴포넌트만 있다고 가정하고, 해당 컴포넌트의 이름은 파일 이름과 동일해야 한다.
- 어떤 컴포넌트를 추적해야 할지 이번주가 가기전에 생각을 해봐야 한다.

### 12/30

- AST 분석을 통해서 한 컴포넌트에서 특정 컴포넌트가 몇번 실행되는지 알 수 있다

### 12/29

done
- entry point부터 모든 app의 module graph를 나타낼 수 있다
- 실제 프로젝트에서 동작하는 것을 확인하기 위해서 `TrelloKanban`이라는 프로젝트를 clone에서 여기서 시작. 해당 프로젝트에 readme는 TRELLO_README.MD 파일을 참고하면 된다