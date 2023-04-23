import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AIR_GRADE, CITIES, TFLAG } from './air.t';

@Entity()
export class AirData {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  dataTime: string; // 측정일시

  @Column({
    type: 'enum',
    enum: CITIES,
  })
  sidoName: CITIES; // 측정 도시

  @Column()
  stationName: string; // 측정소 위치

  @Column({
    type: 'enum',
    enum: AIR_GRADE,
  })
  khaiGrade: AIR_GRADE; // 통합대기환경지수

  @Column()
  khaiValue: number; // 통합대기환경수치

  @Column({
    type: 'varchar',
    nullable: true,
  })
  coFlag: TFLAG; // 일산화탄소 플래그

  @Column({
    type: 'enum',
    enum: AIR_GRADE,
  })
  coGrade: AIR_GRADE; // 일산화탄소 등급

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  coValue: number; // 일산화탄소 농도

  @Column({
    type: 'varchar',
    nullable: true,
  })
  no2Flag: TFLAG; // 이산화질소 플래그

  @Column({
    type: 'enum',
    enum: AIR_GRADE,
  })
  no2Grade: AIR_GRADE; // 이산화질소 등급

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  no2Value: number; // 이산화질소 농도

  @Column({
    type: 'varchar',
    nullable: true,
  })
  o3Flag: TFLAG; // 오존 플래그

  @Column({
    type: 'enum',
    enum: AIR_GRADE,
  })
  o3Grade: AIR_GRADE; // 오존 등급

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  o3Value: number; // 오존 농도

  @Column({
    type: 'varchar',
    nullable: true,
  })
  pm10Flag: TFLAG; // 미세먼지(PM10) 플래그

  @Column({
    type: 'enum',
    enum: AIR_GRADE,
  })
  pm10Grade: AIR_GRADE; // 미세먼지(PM10) 등급

  @Column()
  pm10Value: number; // 미세먼지(PM10) 농도

  @Column({
    type: 'varchar',
    nullable: true,
  })
  pm25Flag: TFLAG; // 미세먼지(PM2.5) 플래그

  @Column({
    type: 'enum',
    enum: AIR_GRADE,
  })
  pm25Grade: AIR_GRADE; // 미세먼지(PM2.5) 등급

  @Column()
  pm25Value: number; // 미세먼지(PM2.5) 농도

  @Column({
    type: 'varchar',
    nullable: true,
  })
  so2Flag: TFLAG; // 아황산가스 플래그

  @Column({
    type: 'enum',
    enum: AIR_GRADE,
  })
  so2Grade: AIR_GRADE; // 아황산가스 등급

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  so2Value: number; // 아황산가스 농도
}
