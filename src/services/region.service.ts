import { api } from "@/lib/api";

export interface RegionResponse {
    rayons: Record<string, string[]>;
    metros: string[];
    nisangahs: string[];
    mtks: string[];
}

export const fetchRegions = async (): Promise<RegionResponse> => {
    const { data } = await api.get<RegionResponse>("/regions");
    return data;
};
