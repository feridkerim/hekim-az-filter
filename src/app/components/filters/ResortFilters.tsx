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

export default function ResortFilters({
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

                {/* Əlavə tikilinin növü */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Əlavə tikilinin növü
                    </label>
                    <select className="border p-2 rounded-md w-full text-sm">
                        <option>Otel</option>
                        <option>Sanatoriya</option>
                        <option>Mini otel / Hostel</option>
                        <option>Kottec</option>
                    </select>
                </div>

                {/* Təmir səviyyəsi */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Təmir səviyyəsi
                    </label>
                    <select className="border p-2 rounded-md w-full text-sm">
                        <option>Təmirli</option>
                        <option>Təmirsiz</option>
                    </select>
                </div>

                {/* Kreditlə satış (yalnız satışda) */}
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
