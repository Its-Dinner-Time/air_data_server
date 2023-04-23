// 시,도 이름
export const CITIES = {
  SEOUL: '서울',
  BUSAN: '부산',
  DAEGU: '대구',
  INCHEON: '인천',
  GWANGJU: '광주',
  DAEJEON: '대전',
  ULSAN: '울산',
  GYEONGGI: '경기',
  GANGWON: '강원',
  CHUNGBUK: '충북',
  CHUNGNAM: '충남',
  JEONBUK: '전북',
  JEONNAM: '전남',
  GYEONGBUK: '경북',
  GYEONGNAM: '경남',
  JEJU: '제주',
  SEJONG: '세종',
} as const;
export type CITIES = (typeof CITIES)[keyof typeof CITIES];

// 플래그 : 점검및교정, 장비점검, 자료이상, 통신장애
export type TFLAG = '점검및교정' | '장비점검' | '자료이상' | '통신장애' | null;

// 대기질 등급
export const AIR_GRADE = {
  GOOD: '1',
  NORMAL: '2',
  BAD: '3',
  VERY_BAD: '4',
} as const;
export type AIR_GRADE = (typeof AIR_GRADE)[keyof typeof AIR_GRADE];

export interface IAIR_KHAI {
  khaiGrade: AIR_GRADE; // 통합대기환경지수
  khaiValue: number; // 통합대기환경수치
}

export interface IAIR_CO {
  coFlag: TFLAG; // 일산화탄소 플래그
  coGrade: AIR_GRADE; // 일산화탄소 등급
  coValue: number; // 일산화탄소 농도
}

export interface IAIR_NO2 {
  no2Flag: TFLAG; // 이산화질소 플래그
  no2Grade: AIR_GRADE; // 이산화질소 지수
  no2Value: number; // 일산화탄소 농도
}

export interface IAIR_O3 {
  o3Flag: TFLAG; // 오존 플래그
  o3Grade: AIR_GRADE; // 오존 지수
  o3Value: number; // 오존 농도
}

export interface IAIR_PM10 {
  pm10Flag: TFLAG; // 미세먼지(PM10) 플래그
  pm10Grade: AIR_GRADE; // 미세먼지(PM10) 지수
  pm10Value: number; // 미세먼지(PM10) 농도
}

export interface IAIR_PM25 {
  pm25Flag: TFLAG; // 미세먼지(PM2.5) 플래그
  pm25Grade: AIR_GRADE; // 미세먼지(PM2.5) 지수
  pm25Value: number; // 미세먼지(PM2.5) 농도
}

export interface IAIR_SO2 {
  so2Flag: TFLAG; // 아황산가스 플래그
  so2Grade: AIR_GRADE; // 아황산가스 지수
  so2Value: number; // 아황산가스 농도
}

export interface IAIR_DATA
  extends IAIR_KHAI,
    IAIR_CO,
    IAIR_NO2,
    IAIR_O3,
    IAIR_PM10,
    IAIR_SO2 {
  dataTime: string; // 측정일시
  sidoName: CITIES; // 측정 도시
  stationName: string; // 측정소 위치
}
