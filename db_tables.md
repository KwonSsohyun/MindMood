# 🗃️ 테이블명: `auth_user` (유저)

| 컬럼명           | 데이터 타입     | 제약 조건          | 기본값                                                      | 설명                          |
|------------------|----------------|--------------------|-------------------------------------------------------------|-------------------------------|
| `user_seq`       | SERIAL         | Primary Key       | 자동 증가                                                   | 고유 식별자                   |
| `user_id`        | VARCHAR(50)    | UNIQUE, NOT NULL  |                                                             | 사용자 ID                     |
| `name`           | VARCHAR(50)    | NOT NULL          |                                                             | 사용자 이름                   |
| `email`          | VARCHAR(100)   | UNIQUE            | NULL 가능                                                   | 사용자 이메일                 |
| `password`       | VARCHAR(100)   | NOT NULL          |                                                             | 사용자 비밀번호               |
| `create_date`    | TIMESTAMP      | NOT NULL          | DEFAULT CURRENT_TIMESTAMP                                   | 계정 생성일                   |
| `select_item`    | INT[]          |                   | **동적 설정 (트리거로 기본값 적용)**                        | 선택된 카테고리 ID 목록 (배열) |

<br/>

# 🗃️ 테이블명: `select_category` (선택 가능한 카테고리)
##### 초기 데이터 : 1 기분 | 2 사건 | 3 감정 | 4 행동 | 5 결과 | 6 제안

| 컬럼명           | 데이터 타입     | 제약 조건       | 기본값               | 설명                                    |
|------------------|----------------|-----------------|----------------------|-----------------------------------------|
| `category_id`    | SERIAL         | Primary Key    | 자동 증가           | 고유 식별자                             |
| `category_name`  | VARCHAR(20)    | UNIQUE, NOT NULL |                    | 고정된 카테고리 이름들 (예: 기분, 사건 등) |

<br/>

# 🗃️ 테이블명: `diary` (일기)
##### 카테고리 : ① mood(기분) | ② event(사건) | ③ emotion(감정) | ④ behavior(행동) | ⑤ result(결과) | ⑥ self(제안)

| 컬럼명            | 데이터 타입           | 제약 조건                          | 기본값               | 설명                                      |
|-------------------|-----------------------|------------------------------------|----------------------|-------------------------------------------|
| `diary_seq`       | SERIAL                | Primary Key                        | 자동 증가            | 고유 식별자                               |
| `user_id`         | VARCHAR(50)           | Foreign Key (`auth_user.user_id`)  |                      | 사용자 ID                                 |
| `mood_level`      | INT                   | NOT NULL                           |                      | 감정 강도 (1-10)                          |
| `mood_emoji`      | VARCHAR               | NOT NULL                           |                      | 감정 이모지 (😀😊😑😥😭)               |
| `event_info`      | VARCHAR               |                                    |                      | 주요 사건                                  |
| `event_with`      | VARCHAR               |                                    |                      | 함께한 사람                                |
| `emotion_type`    | VARCHAR               |                                    |                      | 주요 감정                                  |
| `emotion_detail`  | VARCHAR               |                                    |                      | 감정 이유                                  |
| `behavior_style`  | VARCHAR               |                                    |                      | 행동 기록 (감정 표현 방식)                 |
| `behavior_effect` | VARCHAR               |                                    |                      | 행동 영향 (감정에 미친 영향)               |
| `behavior_reason` | VARCHAR               |                                    |                      | 미표현 이유 (감정을 표현하지 않은 이유)    |
| `result_outcome`  | VARCHAR               |                                    |                      | 사건 결과                                  |
| `result_plan`     | VARCHAR               |                                    |                      | 미래 행동 계획                             |
| `self_goal`       | VARCHAR               |                                    |                      | 느낀점 및 다짐                             |
| `entry_date`      | TIMESTAMP             | NOT NULL                           |                      | 일기 작성일                                |
| `create_date`     | TIMESTAMP             | NOT NULL                           | DEFAULT CURRENT_TIMESTAMP     | 생성일                        |
| `update_date`     | TIMESTAMP             |                                    |                      | 수정일                                     |
