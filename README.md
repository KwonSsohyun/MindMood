# 🌱 MindMood
**감정 기록으로 나를 이해하고, 건강한 마음으로 성장하는 여정**
<br>
> **🌐 배포 URL**  
> [www.mindmood.co.kr](http://www.mindmood.co.kr)

> **🌐 개발 URL**   
> [http://127.0.0.1:3000](http://127.0.0.1:3000)
<br/>

## 👀 프로젝트 소개
- **감정 해소** : 스트레스 완화 및 감정 표현
- **자기 성찰** : 감정 기록을 통한 자기 이해
- **감정 추적** : 감정 변화의 간편한 파악
- **자아 정체성** : 우선순위를 통해 나를 발견

<br/>

## 🗄️ 데이터베이스
- **데이터베이스 종류** : PostgreSQL
- **연결 라이브러리** : `Prisma`를 사용하여 PostgreSQL과 연결

### 설치 및 설정
1. **PostgreSQL 데이터베이스 및 사용자 생성**
```bash
# PostgreSQL 'postgres' 사용자 접속
psql -U postgres

# mindmood 데이터베이스 연결
\c mindmood

# public 스키마 소유자 확인
SELECT nspname AS schema_name, pg_roles.rolname AS owner
FROM pg_catalog.pg_namespace
JOIN pg_catalog.pg_roles ON pg_roles.oid = pg_namespace.nspowner
WHERE nspname = 'public';

# public 스키마의 소유자 mindmood 변경
ALTER SCHEMA public OWNER TO postgres;
ALTER SCHEMA public OWNER TO mindmood;

# mindmood 사용자에게 권한 부여
GRANT USAGE ON SCHEMA public TO mindmood;
GRANT CREATE ON SCHEMA public TO mindmood;

# 변경사항 확인
\dn+ public

# 데이터베이스 연결 종료
\q
```

2. **Prisma 클라이언트 설치**
```bash
npm install @prisma/client
```

3. **Prisma 초기화**
```bash
npx prisma init
```

4. **📦.env 파일 데이터베이스 연결 설정**
```plaintext
DATABASE_URL="postgresql://mindmood:0116@localhost:5432/mindmood"
```

5. **🗄️schema.prisma 파일 테이블 정의** (테이블명 및 컬럼 정의) <br/><br/>

6. **데이터베이스 테이블 생성 및 구조 수정 명령어**
```bash
npx prisma migrate dev
```

7. **애플리케이션 빌드 전 명령어(배포환경 DB작동 설정)**
```bash
npx prisma migrate deploy
```
<br/>

### 테이블 구조
- **`AuthUser`** : 사용자 정보
- **`Diary`** : 사용자 일기 데이터
- **`SelectCategory`** : 선택 가능한 카테고리 목록

### API
`pages/api` 폴더 내에 데이터베이스와 상호작용하는 API 엔드포인트 구현
- **`session`** : 사용자 세션 관리 API
- **`createUser`** : 사용자 생성 API
- **`loginUser`** : 사용자 로그인 API
- **`getDiaries`** : 전체 일기 데이터 조회 API
- **`getExistingDates`** : 전체 일기 작성일 데이터 조회 API
- **`createDiary`** : 일기 데이터 저장 API
- **`updateDiary`** : 특정 일기 데이터 수정 API
- **`deleteDiary`** : 특정 일기 데이터 삭제 API

<br/>

## ⚙️ 개발 환경
- **Runtime Environment** : `Node.js (v20.15.1)`
- **Framework** : `Next.js`
- **Frontend Library** : `React`
- **Type Checking** : `TypeScript`
- **Database** : `PostgreSQL`
- **IDE** : `Visual Studio Code`

<br/>

## 🚀 프로젝트 실행
```bash
npm i                 # 필수 라이브러리 설치
npm run dev           # 개발 서버 실행
npm run build         # 서버 빌드 수행
npm start             # 서버 실행
```

<br/>

## 🖥️ 화면 설계
### 1. 사용자 관리
- 회원가입 기능
- 로그인 기능

### 2. 메인 - 감정 달력
- 감정 이모지 표현 (최고, 좋음, 보통, 안좋음, 많이 나쁨)
- GNB 헤더 : 감정 차트 | 일기 목록 | 일기 작성

### 3. 서브 - 일기 기록
- **구성 요소** : 사건, 감정, 행동, 결과, 제안

  1. **오늘의 기분 점검**
     - 감정 강도 : 1-10점 선택
     - 감정 이모지 : 기쁨, 행복, 설렘, 중립, 불안, 짜증, 우울, 슬픔, 후회, 분노 선택
  
  2. **사건 기록**
     - 주요 사건 : 시간, 장소, 내용 작성
     - 함께한 사람 : 가족, 친구, 연인, 동료, 상사, 부하, 지인, 친척, 혼자, 직접 입력
  
  3. **감정 탐구**
     - 주요 감정 : 감정 선택
     - 감정 이유 : 감정의 이유와 상황 작성
  
  4. **행동/반응 분석**
     - 행동 기록 : 감정 표현 방식 작성
     - 행동 영향 : 감정에 미친 영향 작성
     - 미표현 이유 : 감정을 표현하지 않은 이유 작성
  
  5. **결과 평가**
     - 결과 : 사건 결과 작성
     - 원하는 행동 : 미래 행동 계획 작성
  
  6. **자기 제안**
     - 느낀 점과 다짐 : 긍정적인 메시지나 다짐 작성

### 4. 서브 - 일기 목록
- 리스트 형식 표시

### 5. 서브 - 일기 상세
- 수정 및 삭제 기능

### 6. 서브 - 감정 차트
- 월간 감정 분석 (원그래프, 선그래프)

<br/>

## 🗂️ 디렉토리 구조
```bash
📁 MindMood
│
├── 🧩 components
│   ├── 📁 layout                               # 레이아웃 컴포넌트
│   │   ├── Header.tsx			        # 헤더
│   │   ├── Footer.tsx				# 푸터
│   │   └── Sidebar.tsx			        # 사이드바
│   ├── 📁 common                              # 공통 사용 컴포넌트
│   │   ├── TopButton.tsx		        # 탑 버튼
│   │   └── ButtonStyle.tsx		        # 버튼 스타일
│   ├── 📁 auth                                # 사용자 인증 컴포넌트
│   │   ├── UserSignupForm.tsx		        # 회원가입
│   │   └── UserLoginForm.tsx			# 로그인
│   ├── 📁 calendar
│   │   └── Calendar.tsx			# [메인] 감정 달력 컴포넌트
│   ├── 📁 diary				# [서브 2,3,4] 감정일기 관련 컴포넌트 (작성, 목록, 상세, 수정, 삭제)
│   │   ├── 📁 form				# [서브 2-1] 일기 작성
│   │   │   ├── DiaryEntryForm.tsx		# [서브 2-1] 일기 상위 컴포넌트
│   │   │   ├── MoodCheck.tsx		        # [서브 2-1] 1) 오늘의 기분 점검
│   │   │   ├── EventRecord.tsx		        # [서브 2-1] 2) 사건 기록
│   │   │   ├── EmotionAnalysis.tsx	        # [서브 2-1] 3) 감정 탐구
│   │   │   ├── BehaviorAnalysis.tsx	        # [서브 2-1] 4) 행동/반응 분석
│   │   │   ├── ResultEvaluation.tsx	        # [서브 2-1] 5) 결과 평가
│   │   │   └── SelfSuggestion.tsx		# [서브 2-1] 6) 자기 제안
│   │   ├── 📁 list				# [서브 3,4] 감정일기 목록 및 상세
│   │   │   ├── DiaryList.tsx			# [서브 3] 일기 목록
│   │   │   ├── DiaryDetail.tsx                 # [서브 4-1] 일기 상세(수정, 삭제)
│   │   │   └── DiaryEdit.tsx		        # [서브 4-2] 일기 수정
│   └── 📁 chart				# [서브 5] 월간 감정 차트
│        ├── DiaryEntryChart.tsx                # [서브 5-1] 차트 상위 컴포넌트
│        ├── PieChart.tsx			# [서브 5-1] 원 그래프
│        └── LineChart.tsx			# [서브 5-1] 선 그래프
│
├── 🔗 pages
│   ├── 📁 api                                 # 데이터베이스 API
│   │   ├── session.ts			        # 사용자 세션 관리
│   │   ├── createUser.ts			# 사용자 데이터 생성
│   │   ├── loginUser.ts			# 사용자 로그인
│   │   ├── getDiaries.ts			# 전체 일기 데이터 조회
│   │   ├── getExistingDates.ts			# 전체 일기 작성일 데이터 조회
│   │   ├── createDiary.ts			# 일기 데이터 저장
│   │   ├── 📁 updateDiary		        # 특정 ID 일기 데이터 수정
│   │   │   └── [id].ts		               
│   │   └── 📁 deleteDiary			# 특정 ID 일기 데이터 삭제
│   │       └── [id].ts		                
│   ├── _app.tsx                        	# 공통 컴포넌트 정의
│   ├── index.tsx                        	# 메인 페이지(감정 달력)
│   ├── signup.tsx                        	# 회원가입 페이지
│   ├── login.tsx                        	# 로그인 페이지
│   ├── 📁 diary                               # 일기 관련 페이지
│   │   ├── NewDiary.tsx			# 일기 작성 페이지
│   │   ├── ListDiary.tsx			# 일기 목록 페이지
│   │   └── [id].tsx				# 일기 상세 페이지(수정, 삭제)
│   ├── chart.tsx			        # 감정 차트 페이지
│   └── 404.tsx			                # 에러 페이지
│
├── 🖼️ public
│   └── icon.ico                      	        # 파비콘 파일
│
├── 🎨 styles
│   └── globals.css                      	# 글로벌 스타일 CSS 파일
│
├── 💾 prisma
│   └── schema.prisma                           # Prisma 데이터베이스 스키마 정의
│
├── 🔧 lib
│   ├── prisma.ts                               # Prisma 클라이언트 설정
│   └── session.js                              # Express 세션 미들웨어 설정
│
├── 🗃️ context                            	# 공통 세션 관리 폴더
│   └── SessionContext.js                       # 사용자 세션 상태 관리
│
├── 🗃️ stores                            	# MobX 스토어 폴더
│   ├── index.tsx                        	# 스토어 모음 및 내보내기
│   ├── UserStore.tsx                           # 사용자 상태 관리 스토어
│   └── DiaryStore.tsx                          # 일기 상태 관리 스토어
│
├── 📜 types
│   ├── user.ts                         	# 사용자 데이터 타입 정의
│   ├── diary.ts                         	# 일기 데이터 타입 정의
│   ├── next-session.d.ts                       # Next.js API 요청 세션 타입 정의
│   └── next-auth.d.ts                          # NextAuth.js 세션 타입 확장 정의
│
├── ⚙️ .env                    	                # 환경 변수 설정 파일
├── ⚙️ next.config.js                    	# Next.js 설정 파일
├── ⚙️ next-env.d.ts                    	# Next.js 설정 파일
├── ⚙️ package.json                      	# 프로젝트 의존성 설정
└── ⚙️ tsconfig.json                     	# TypeScript 설정 파일
```

<br/>

## 🎨 브랜드 컬러
<img src="https://i.pinimg.com/564x/9c/86/d2/9c86d29ae3d83d9c8d9307f2519ff059.jpg" alt="MindMood Brand Color" style="width: 30%; height: auto;">

### 1. 메인 컬러
- **주색** : `#4C956C` (라이트 그린)  

### 2. 서브 컬러
- **강조색** : `#2C6E49` (딥 그린)
- **보조색** : `#D6E7DB` (연한 그린)
- **배경색** : `#FEFEE3` (아이보리)  
- **구분색** : `#F5F3F5` (라이트 그레이)  

### 3. 포인트 컬러
- **긍정 감정** : `#FFC9B9` (파스텔 핑크)  
- **알림/유도** : `#D68C45` (오렌지)

<br/>
