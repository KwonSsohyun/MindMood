# 🌱 MindMood
**감정 기록으로 나를 이해하고, 건강한 마음으로 성장하는 여정**
<br>
> **🌐 배포 URL**  
> [www.mindmood.co.kr](http://www.mindmood.co.kr)

<br/>

## 👀 프로젝트 소개
- **감정 해소** : 스트레스 완화 및 감정 표현
- **자기 성찰** : 감정 기록을 통한 자기 이해
- **감정 추적** : 감정 변화의 간편한 파악
- **자아 정체성** : 우선순위를 통해 나를 발견

<br/>

## 🖥️ 화면 설계
1. **메인 - 감정 달력**
   - 감정 이모지 표현 (최고, 좋음, 보통, 안좋음, 많이 나쁨)
   - 일기목록 / 일기작성 버튼

2. **서브 - 일기 기록** 
   - (사건, 감정, 행동, 결과, 제안)

   1) **오늘의 기분 점검**
      - 감정 강도 : 1-10점 선택
      - 감정 이모지 : 기쁨, 행복, 설렘, 중립, 불안, 짜증, 우울, 슬픔, 후회, 분노 선택

   2) **사건 기록**
      - 주요 사건 : 시간, 장소, 내용 작성
      - 함께한 사람 : 가족, 친구, 연인, 동료, 상사, 부하, 지인, 친척, 혼자, 직접 입력

   3) **감정 탐구**
      - 주요 감정 : 감정 선택
      - 감정 이유 : 감정의 이유와 상황 작성

   4) **행동/반응 분석**
      - 행동 기록 : 감정을 표현한 방식 작성
      - 행동 영향 : 감정에 미친 영향 작성
      - 미표현 이유 : 감정을 표현하지 않은 이유 작성

   5) **결과 평가**
      - 결과 : 사건 결과 작성
      - 원하는 행동 : 미래 행동 계획 작성

   6) **자기 제안**
      - 느낀 점과 다짐 : 긍정적인 메시지나 다짐 작성

3. **서브 - 일기 목록**
   - 리스트 형식

4. **서브 - 일기 상세**
   - 수정 / 삭제 기능

5. **서브 - 감정 차트**
   - 월간 감정 분석 (원그래프, 선그래프)

<br/>

## 🗂 디렉토리 구조
```bash
📁 MindMood
│
├── 🧩 components
│   ├── 📁 layout                               # 공통 사용 컴포넌트
│   │   ├── Header.tsx			        # 헤더
│   │   ├── Footer.tsx				# 푸터
│   │   └── Sidebar.tsx			        # 사이드바
│   ├── 📁 calendar
│   │   └── Calendar.tsx			# [메인] 감정 달력 컴포넌트
│   ├── 📁 diary				# [서브 2,3,4] 감정일기 관련 컴포넌트 (작성, 목록, 상세, 수정, 삭제)
│   │   ├── 📁 form				# [서브 2-1] 일기 작성
│   │   │   ├── DiaryEntryForm.tsx	        # [서브 2-1] 일기 전체를 관리하는 상위 컴포넌트
│   │   │   ├── MoodCheck.tsx		        # [서브 2-1] 1) 오늘의 기분 점검
│   │   │   ├── EventRecord.tsx		        # [서브 2-1] 2) 사건 기록
│   │   │   ├── EmotionAnalysis.tsx	        # [서브 2-1] 3) 감정 탐구
│   │   │   ├── BehaviorAnalysis.tsx	        # [서브 2-1] 4) 행동/반응 분석
│   │   │   ├── ResultEvaluation.tsx	        # [서브 2-1] 5) 결과 평가
│   │   │   ├── SelfSuggestion.tsx		# [서브 2-1] 6) 자기 제안
│   │   ├── 📁 list				# [서브 3,4] 감정일기 목록 및 상세
│   │   │   ├── DiaryList.tsx			# [서브 3] 일기 목록
│   │   │   ├── DiaryDetail.tsx                 # [서브 4-1] 일기 상세(수정, 삭제)
│   │   │   └── DiaryEdit.tsx		        # [서브 4-2] 일기 수정
│   ├── 📁 chart				# [서브 5] 월간 감정 차트
│        ├── PieChart.tsx			# [서브 5-1] 원 그래프
│        └── LineChart.tsx			# [서브 5-2] 선 그래프
│
├── 🗃️ stores                            	# 공통 상태 관리 폴더
│   └── diaryStore.tsx                 		# 일기 상태 관리
│
├── 🔗 pages
│   ├── 📁 api                                  # 데이터베이스 API
│   │   ├── getDiaries.ts			# 전체 일기 데이터 조회
│   │   ├── createDiary.ts			# 일기 데이터 저장
│   │   ├── updateDiary.ts			# 특정 일기 데이터 수정
│   │   └── deleteDiary.ts			# 특정 일기 데이터 삭제
│   ├── _app.tsx                        	# 공통 컴포넌트 정의
│   ├── index.tsx                        	# 메인 페이지(감정 달력)
│   ├── diary
│   │   ├── NewDiary.tsx			# 일기 작성 페이지
│   │   ├── ListDiary.tsx			# 일기 목록 페이지
│   │   └── [id].tsx				# 일기 상세 페이지(수정, 삭제)
│   └── chart.tsx			        # 감정 차트 페이지
│
├── 🎨 styles
│   ├── globals.css                      	# 글로벌 스타일 CSS 파일
│   ├── calendar.css                		# 감정 달력 스타일
│   ├── diary.css                   		# 일기 스타일
│   └── chart.css                   		# 차트 스타일
│
├── 📜 types
│   └── diary.ts                         	# 일기 데이터 타입 정의
│
├── 🛠️ utils
│   └── dateUtils.ts                     	# 날짜 처리 유틸 함수
│
├── ⚙️ next.config.js                    	# Next.js 설정 파일
├── ⚙️ next-env.d.ts                    	# Next.js 설정 파일
├── ⚙️ package.json                      	# 프로젝트 의존성 설정
└── ⚙️ tsconfig.json                     	# TypeScript 설정 파일
```

<br/>

## ⚙️ 개발 환경
- **Framework** : `Next.js`
- **Frontend Library** : React
- **Type Checking** : TypeScript
- **IDE** : Visual Studio Code

<br/>

##  브랜드 컬러
- 메인 컬러 : 민트 그린 (Mint Green): #A8E6CF
- 서브 컬러 : 라벤더 (Lavender): #D7B2E6
#2C6E49
#4C956C

#FEFEE3

#FFC9B9

#D68C45

#2C6E49