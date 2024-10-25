# UserSignupForm 컴포넌트
### 🗃️ 테이블명: `users` (유저)

| 컬럼명            | 설명                                        | 제약 조건                |
|-------------------|---------------------------------------------|--------------------------|
| `id`              | 고유 식별자                                 | Primary Key              |
| `username`        | 사용자 이름                                | NULL 불가                |
| `user_id`         | 사용자 ID                                  | Unique, NULL 불가        |
| `email`           | 사용자 이메일                              | Unique, NULL 가능        |
| `password`        | 사용자 비밀번호                            | NULL 불가                |
| `created_at`      | 생성일                                      | Timestamp                |
| `selected_items`  | 선택한 항목 목록 (기분, 사건, 감정, 행동, 결과, 제안) | VARCHAR                  |


# MoodCheck 컴포넌트
### 🗃️ 테이블명: `mood_check` (기분 점검)

| 컬럼명       | 설명             | 제약 조건                              |
|--------------|------------------|----------------------------------------|
| `id`         | 고유식별자        | Primary Key                            |
| `user_id`    | 사용자 ID         | Foreign Key (`users.user_id`), NULL 가능 |
| `intensity`  | 감정 강도 (1-10) | INT                                    |
| `emoji`      | 감정 이모지       | VARCHAR (기쁨, 행복, 설렘, 중립, 불안 등)   |
| `created_at` | 작성일           | Timestamp                              |
| `updated_at` | 수정일           | Timestamp                              |



# EventRecord 컴포넌트
### 🗃️ 테이블명: `event_record` (사건 기록)

| 컬럼명       | 설명                | 제약 조건                              |
|--------------|---------------------|----------------------------------------|
| `id`         | 고유식별자           | Primary Key                            |
| `user_id`    | 사용자 ID            | Foreign Key (`users.user_id`), NULL 가능 |
| `event`      | 주요 사건            | VARCHAR                                |
| `details`    | 사건 세부사항         | VARCHAR (시간, 장소, 내용 포함)            |
| `companion`  | 함께한 사람          | VARCHAR                                |
| `created_at` | 작성일              | Timestamp                              |
| `updated_at` | 수정일              | Timestamp                              |



# EmotionAnalysis 컴포넌트
### 🗃️ 테이블명: `emotion_analysis` (감정 탐구)

| 컬럼명       | 설명          | 제약 조건                              |
|--------------|---------------|----------------------------------------|
| `id`         | 고유식별자     | Primary Key                            |
| `user_id`    | 사용자 ID      | Foreign Key (`users.user_id`), NULL 가능 |
| `emotion`    | 주요 감정      | VARCHAR                                |
| `reason`     | 감정 이유      | VARCHAR                                   |
| `created_at` | 작성일        | Timestamp                              |
| `updated_at` | 수정일        | Timestamp                              |



# BehaviorAnalysis 컴포넌트
### 🗃️ 테이블명: `behavior_analysis` (행동/반응 분석)

| 컬럼명       | 설명             | 제약 조건                              |
|--------------|------------------|----------------------------------------|
| `id`         | 고유식별자        | Primary Key                            |
| `user_id`    | 사용자 ID         | Foreign Key (`users.user_id`), NULL 가능 |
| `expression` | 감정 표현 방식     | VARCHAR                                   |
| `impact`     | 감정에 미친 영향   | VARCHAR                                   |
| `reason`     | 미표현 이유       | VARCHAR                                   |
| `created_at` | 작성일           | Timestamp                              |
| `updated_at` | 수정일           | Timestamp                              |



# ResultEvaluation 컴포넌트
### 🗃️ 테이블명: `result_evaluation` (결과 평가)

| 컬럼명       | 설명             | 제약 조건                              |
|--------------|------------------|----------------------------------------|
| `id`         | 고유식별자        | Primary Key                            |
| `user_id`    | 사용자 ID         | Foreign Key (`users.user_id`), NULL 가능 |
| `result`     | 사건 결과         | VARCHAR                                   |
| `plan`       | 향후 행동 방안     | VARCHAR                                   |
| `created_at` | 작성일           | Timestamp                              |
| `updated_at` | 수정일           | Timestamp                              |



# SelfSuggestion 컴포넌트
### 🗃️ 테이블명: `self_suggestion` (자기 제안)

| 컬럼명       | 설명                   | 제약 조건                              |
|--------------|------------------------|----------------------------------------|
| `id`         | 고유식별자              | Primary Key                            |
| `user_id`    | 사용자 ID               | Foreign Key (`users.user_id`), NULL 가능 |
| `insight`    | 느낀 점과 다짐          | VARCHAR                                   |
| `created_at` | 작성일                 | Timestamp                              |
| `updated_at` | 수정일                 | Timestamp                              |
