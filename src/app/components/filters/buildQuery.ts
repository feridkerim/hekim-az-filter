// components/filters/buildQuery.ts

export type Mode = "satish" | "icare";

export interface FloorPosition {
    firstNot: boolean;
    topNot: boolean;
    onlyTop: boolean;
}

export interface FiltersState {
    mode: Mode;
    type: string;

    rooms: string[];
    rentTypes: string[];

    floorPosition: FloorPosition;

    selectedRegion: string;
    selectedRegionItems: string[];
}

/**
 * Filter state-lərini URL query string-ə çevirir.
 * Nümunə: mode=satish&type=Yeni%20tikili&rooms=2,3&areas=Yasamal%20r.,Yeni%20Yasamal
 */
export function buildSearchQuery(state: FiltersState): string {
    const params = new URLSearchParams();

    // mode, type
    params.set("mode", state.mode);
    params.set("type", state.type);

    // otaq sayı
    if (state.rooms.length > 0) {
        params.set("rooms", state.rooms.join(","));
    }

    // icarə növü (yalnız mode = icare üçün mənalıdır, amma hər halda yazırıq)
    if (state.rentTypes.length > 0) {
        params.set("rentTypes", state.rentTypes.join(","));
    }

    // mərtəbə yerləşməsi
    const { firstNot, topNot, onlyTop } = state.floorPosition;
    if (firstNot) params.set("noFirstFloor", "1");
    if (topNot) params.set("noTopFloor", "1");
    if (onlyTop) params.set("onlyTopFloor", "1");

    // şəhər
    params.set("city", state.selectedRegion);

    // rayon / qəsəbə / metro / nişangah / mtk – hamısı string kimi
    if (state.selectedRegionItems.length > 0) {
        params.set("areas", state.selectedRegionItems.join(","));
    }

    return params.toString();
}
