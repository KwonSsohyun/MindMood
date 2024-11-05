/**
 * ▶ LineChart 컴포넌트
 *
 * 감정 차트(선 그래프)
 * - 현재 월의 감정 이모지 수에 따라 선그래프 표시
 * - 해당 월에 1개라도 감정 이모지가 없으면 미표시
 */
/**
 * ▶ LineChart 컴포넌트
 *
 * 감정 차트(선 그래프)
 * - 현재 월의 감정 이모지 수에 따라 선그래프 표시
 * - 해당 월에 1개라도 감정 이모지가 없으면 미표시
 */
/**
 * ▶ LineChart 컴포넌트
 *
 * 감정 차트(선 그래프)
 * - 현재 월의 감정 이모지 수에 따라 선그래프 표시
 * - 해당 월에 1개라도 감정 이모지가 없으면 미표시
 */
import React from 'react';
import { ResponsiveLine } from '@nivo/line';


export default function LineChart({ data }) {

    return <>
        <div style={{ height: "400px", width: "100%" }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 20, right: 20, bottom: 80, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 1,
                    max: 10,
                    stacked: false,
                    reverse: false,
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    legend: '일자',
                    legendPosition: 'middle',
                    legendOffset: 50,
                }}
                axisLeft={{
                    legend: '감정 강도',
                    legendPosition: 'middle',
                    legendOffset: -50,
                    tickValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                }}
                lineWidth={3}
                pointSize={10}
                pointColor="#FFFFFF"
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                tooltip={({ point }) => (
                    <div
                        style={{
                            background: 'white',
                            padding: '12px',
                            borderRadius: '10px',
                            border: '1px solid #4C956C',
                        }}
                    >
                        <strong>일자 :</strong> <strong>{point.data.xFormatted}</strong><br />
                        <strong>감정 강도 :</strong> <strong>{point.data.yFormatted}</strong>
                    </div>
                )}
                colors="#4C956C"
                theme={{
                    crosshair: {
                        line: {
                            stroke: '#afd0b8',
                            strokeWidth: 2,
                            strokeDasharray: '6 6',
                        },
                    },
                    axis: {
                        ticks: {
                            text: {
                                fontSize: 14, // 글자 크기
                                fontWeight: 'normal', // 글자 두께
                                fill: '#4C956C', // 글자 색상
                                fontFamily: 'inherit', // 기본 폰트 사용
                            },
                        },
                        legend: {
                            text: {
                                fontSize: 16, // 범례 글자 크기
                                fontWeight: 'bold', // 범례 글자 두께
                                fill: '#2C6E49', // 범례 글자 색상
                                fontFamily: 'inherit', // 기본 폰트 사용
                            },
                        },
                    },
                }}
            />
        </div>
    </>
}