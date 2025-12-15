"use client";

import React from "react";
import RegionSelect from "../region/RegionSelect";
import {NumberRangeField} from "./common/NumberRangeField";
import {ToggleButtonGroup} from "./common/ToggleButtonGroup";
import type {FloorPosition} from "./buildQuery";

interface Props {
    mode: "satish" | "icare";

    rooms: string[];
    setRooms: (v: string[]) => void;

    rentTypes: string[];
    setRentTypes: (v: string[]) => void;

    floorPosition: FloorPosition;
    setFloorPosition: (v: FloorPosition) => void;

    selectedRegion: string;
    setSelectedRegion: (v: string) => void;

    selectedRegionItems: string[];
    setSelectedRegionItems: (v: string[]) => void;

    tempSelectedItems: string[];
    setTempSelectedItems: (v: string[]) => void;

    openModal: () => void;
}

const ROOM_OPTIONS = ["1", "2", "3", "4", "5+"];

export default function LandHouseFilters({
                                             mode,
                                             rooms,
                                             setRooms,
                                             rentTypes,
                                             setRentTypes,
                                             selectedRegion,
                                             setSelectedRegion,
                                             selectedRegionItems,
                                             setSelectedRegionItems,
                                             tempSelectedItems,
                                             setTempSelectedItems,
                                             openModal,
                                         }: Props) {
    return (
        <div className="grid grid-cols-3 gap-6 mt-6">
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
                <NumberRangeField label="Qiymət (AZN)"/>

                {/* Sahə */}
                <NumberRangeField label="Sahə (KVM)"/>


            </div>

            {/* SAĞ BLOK */}
            <div className="space-y-5">
                {/* Torpağın sahəsi */}
                <NumberRangeField
                    label="Torpağın sahəsi (sot)"
                    minWidth={96}
                    maxWidth={96}
                />
                {/* Kreditlə satış yalnız satış modunda */}
                {mode === "satish" && (
                    <NumberRangeField
                        label="Kreditlə satış"
                        minPlaceholder="İlkin ödəniş"
                        maxPlaceholder="Aylıq ödəniş"
                    />
                )}
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
                        <input type="checkbox"/>
                        Çıxarış var
                    </label>

                    <label className="flex items-center gap-2">
                        <input type="checkbox"/>
                        İpoteka var
                    </label>
                </div>

                {/* Azərbaycan rayonları */}

            </div>
            <RegionSelect
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                selectedItems={selectedRegionItems}
                setSelectedItems={setSelectedRegionItems}
                openModal={openModal}
            />
        </div>
    );
}
