"use client";

import React from "react";
import RegionSelect from "../region/RegionSelect";
import { NumberRangeField } from "./common/NumberRangeField";
import { ToggleButtonGroup } from "./common/ToggleButtonGroup";

interface Props {
    mode: "satish" | "icare";

    rooms: string[];
    setRooms: (v: string[]) => void;

    selectedRegion: string;
    setSelectedRegion: (v: string) => void;

    selectedRegionItems: string[];
    setSelectedRegionItems: (v: string[]) => void;

    tempSelectedItems: string[];
    setTempSelectedItems: (v: string[]) => void;

    openModal: () => void;
}

const ROOM_OPTIONS = ["1", "2", "3", "4", "5+"];

export default function OfficeFilters({
                                          mode,
                                          rooms,
                                          setRooms,
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
                {/* Otaq sayı */}
                <ToggleButtonGroup
                    label="Otaq sayı"
                    options={ROOM_OPTIONS}
                    value={rooms}
                    onChange={setRooms}
                />

                {/* Qiymət */}
                <NumberRangeField label="Qiymət (AZN)" />

                {/* Sahə */}
                <NumberRangeField label="Sahə (KVM)" />

                {/* Kredit — yalnız satışda */}
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
                {/* Əlavə tikili növü */}
                <div>
                    <label className="text-[12px] text-gray-600 font-semibold">
                        Əlavə tikilinin növü
                    </label>
                    <select className="border p-2 rounded-md w-full text-sm">
                        <option>Biznes mərkəzi</option>
                        <option>Həyət evi / villa</option>
                        <option>Yeni tikili</option>
                        <option>Köhnə tikili</option>
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

                {/* Çıxarış / İpoteka */}
                <div className="flex gap-6 mt-2 text-sm">
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
