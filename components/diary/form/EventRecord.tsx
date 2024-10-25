/**
 * ▶ EventRecord 컴포넌트
 *
 * 2) 사건 기록
 * - 주요 사건 작성(시간, 장소, 내용)
 * - 함께한 사람 선택 또는 입력
 * 
 * 🗃️ DB 테이블명       : event_record
 * 📊 DB 컬럼명
 * - id                 : 고유식별자 (Primary Key)
 * - user_id            : 사용자 ID (Foreign Key, users 테이블의 user_id 참조, NULL 가능)
 * - event              : 주요 사건 (VARCHAR)
 * - details            : 사건 세부사항(시간, 장소, 내용 포함) (TEXT)
 * - companion          : 함께한 사람 (VARCHAR)
 * - created_at         : 작성일 (Timestamp)
 * - updated_at         : 수정일 (Timestamp)
 */
import React from 'react';

export default function EventRecord() {
    return <>
    
    </>
}