# wanted pre-onboarding challenge

CRUD w React Query를 이용한 pre-onboarding challenge 프로젝트 입니다.
해당 문서는 프로젝트를 진행할때 다른 동료가 쉽게 이해할 수 있도록 아래와 같은 내용이 기술되어 있습니다.

```
1. 프로젝트 목표
2. 실행 스크립트
3. 요구사항 분석
```

</br>

## 1. 프로젝트 목표

- Typescript를 도입하여 코드에 목적을 명시하고 목적에 맞지 않는 타입의 변수나 함수들에서 에러를 발생시켜 버그를 사전에 제거하도록 한다.

- React Query를 활용하여 서버와 클라이언트의 상태를 분리하도록 한다.

</br>

## 2. 실행 스크립트

### 2.1 개발모드 실행

webpack-dev-server를 통해 개발 환경에서 즉시 실행 가능한 리액트 웹 애플리케이션을 구동하는 명령어 입니다.

```javascript
 npm run start
```

### 2.2 Unit 테스트

컴포넌트 전체의 Unit테스트를 돌릴때 사용합니다.

```javascript
npm run test:unit
```

모듈별로 테스트 하고 싶다면 아래와 같이 명령어를 실행합니다.
예를들어 NotFoundPage컴포넌트 unit 테스트를 수행하고 싶으면 `npm run test unit: src/NotFoundPage.test.jsx` 와 같이 명령어를 입력합니다.

```
npm run test unit: src/파일명
```

### 2.3 Lint 검사

eslint로 전체 프로젝트에 대해서 lint를 수행합니다.

```javascript
npm run lint
```

### 2.4 번들링 빌드

```javascript
npm run build
```

</br>

## 3. 요구사항 분석

</br>
