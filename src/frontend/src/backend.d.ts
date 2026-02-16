import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface TestResult {
    timestamp: Time;
    advice: string;
    riskLevel: RiskLevel;
    submission: TestSubmission;
}
export interface TestSubmission {
    age: bigint;
    alcohol: boolean;
    lump: boolean;
    name: string;
    pain: boolean;
    weightLoss: boolean;
    smoking: boolean;
    gender: Gender;
    image?: ExternalBlob;
}
export type Time = bigint;
export interface HealthTip {
    title: string;
    icon: string;
    description: string;
}
export interface UserProfile {
    name: string;
    email?: string;
}
export enum Gender {
    other = "other",
    female = "female",
    male = "male"
}
export enum RiskLevel {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addHealthTip(tip: HealthTip): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllHealthTips(): Promise<Array<HealthTip>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyResults(): Promise<TestResult | null>;
    getRiskLevelText(level: RiskLevel): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitTest(submission: TestSubmission): Promise<TestResult>;
}
