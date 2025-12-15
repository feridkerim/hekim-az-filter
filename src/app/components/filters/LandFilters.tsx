"use client";

import React from "react";
import RegionSelect from "../region/RegionSelect";
import { NumberRangeField } from "./common/NumberRangeField";

interface Props {
    mode: "satish" | "icare";

    selectedRegion: string;
    setSelectedRegion: (v: string) => void;

    selectedRegionItems: string[];
    setSelectedRegionItems: (v: string[]) => void;

    tempSelectedItems: string[];
    setTempSelectedItems: (v: string[]) => void;

    openModal: () => void;
}

export default function LandFilters({
                                        mode,
                                        selectedRegion,
                                        setSelectedRegion,
                                        selectedRegionItems,
                                        setSelectedRegionItems,
                                        tempSelectedItems,
                                        setTempSelectedItems,
                                        openModal,
                                    }: Props) {
    return (
        <div className="grid grid-cols-2 gap-6 mt-6">
            {/* SOL BLOK */}
            <div className="space-y-5">
                {/* Qiymət */}
                <NumberRangeField label="Qiymət (AZN)" />

                {/* Torpağın sahəsi (sot) */}
                <NumberRangeField
                    label="Torpağın sahəsi (sot)"
                />

                {/* Kreditlə satış — yalnız SATIŞ modunda */}
                {mode === "satish" && (
                    <NumberRangeField
                        label="Kreditlə satış"
                        minPlaceholder="İlkin ödəniş"
                        maxPlaceholder="Aylıq ödəniş"
                    />
                )}
            </div>

            {/* SAĞ BLOK */}
            <div className="space-y-5">
                {/* Çıxarış / İpoteka */}
                <div className="flex gap-6 text-sm mt-2">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        Çıxarış var
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        İpoteka var
                    </label>
                </div>

                {/* Azərbaycan rayonları */}
                <RegionSelect
                    selectedRegion={selectedRegion}
                    setSelectedRegion={setSelectedRegion}
                    selectedItems={selectedRegionItems}
                    setSelectedItems={setSelectedRegionItems}
                    openModal={openModal}
                />
            </div>
        </div>
    );
}
