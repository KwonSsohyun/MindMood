/**
 * ▶ PieChart 컴포넌트
 *
 * 감정 차트(원 그래프)
 * - 현재 월의 감정 이모지 수에 따라 원그래프 표시
 * - 해당 월에 1개라도 감정 이모지가 없으면 미표시
 */
import React from 'react';
import { ResponsivePie } from '@nivo/pie';


export default function PieChart({ data }) {

    const emojiColors = {
        '😄': '#FFEE93',  // 기쁨 - 파스텔 노랑
        '😊': '#FFE4A1',  // 행복 - 파스텔 오렌지
        '😃': '#FFD59E',  // 설렘 - 부드러운 오렌지
        '😐': '#E0E0E0',  // 중립 - 파스텔 회색
        '😟': '#B4E1FF',  // 불안 - 파스텔 블루
        '😠': '#FFA8A8',  // 짜증 - 파스텔 레드
        '😢': '#A0C4FF',  // 우울 - 파스텔 블루
        '😞': '#D4A5A5',  // 슬픔 - 부드러운 갈색
        '😔': '#BDBDBD',  // 후회 - 부드러운 회색
        '😡': '#FF9999',  // 분노 - 파스텔 빨강
    };

    const getColor = (d) => emojiColors[d.id];

    return <>
        <div style={{ height: "400px", width: "100%" }}>
        <ResponsivePie
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                colors={getColor}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={360}
                arcLinkLabelsTextColor="transparent" 
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor="transparent"
                arcLabelsSkipAngle={10}
                arcLabelsTextColor="#333333"
                arcLabel={(datum) => `${datum.id} ${datum.value}`}
                theme={{
                    labels: {
                        text: {
                            fontSize: 17, // 글자 크기 설정
                            fontWeight: 'bold',
                            fontFamily: 'inherit' // 기본 폰트 사용
                        },
                    },
                }}
                tooltip={({ datum }) => (
                    <div
                        style={{
                            padding: '10px',
                            background: '#ffffff',
                            border: `2px solid ${getColor(datum)}`,
                            borderRadius: '50px'
                        }}
                    >
                        <strong>{datum.id}</strong> : <strong>{datum.value}</strong>
                    </div>
                )}
            />
        </div>
    </>
}
