"use client";

import React from "react";
import RegionSelect from "../region/RegionSelect";

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
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Qiymət (AZN)
                    </label>

                    <div className="flex gap-2 mt-1">
                        <input
                            className="border p-2 rounded-md w-28"
                            placeholder="min"
                        />
                        <input
                            className="border p-2 rounded-md w-28"
                            placeholder="max"
                        />
                    </div>
                </div>

                {/* Torpağın sahəsi (sot) */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Torpağın sahəsi (sot)
                    </label>

                    <div className="flex gap-2 mt-1">
                        <input
                            className="border p-2 rounded-md w-24"
                            placeholder="min"
                        />
                        <input
                            className="border p-2 rounded-md w-24"
                            placeholder="max"
                        />
                    </div>
                </div>

                {/* Kreditlə satış — yalnız SATIŞ modunda */}
                {mode === "satish" && (
                    <div>
                        <label className="text-[12px] text-gray-600 font-semibold">
                            Kreditlə satış
                        </label>

                        <div className="flex gap-2 mt-1">
                            <input
                                className="border p-2 rounded-md w-28"
                                placeholder="İlkin ödəniş"
                            />
                            <input
                                className="border p-2 rounded-md w-28"
                                placeholder="Aylıq ödəniş"
                            />
                        </div>
                    </div>
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
                    tempItems={tempSelectedItems}
                    setTempItems={setTempSelectedItems}
                    openModal={openModal}
                />
            </div>
        </div>
    );
}
