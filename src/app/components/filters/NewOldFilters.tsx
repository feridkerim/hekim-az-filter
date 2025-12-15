"use client";

import React from "react";
import RegionSelect from "../region/RegionSelect";
import {NumberRangeField} from "./common/NumberRangeField";
import {ToggleButtonGroup} from "./common/ToggleButtonGroup";
import RepairLevelToggle from "./common/RepairLevelSelect";
import type {FloorPosition} from "./buildQuery";
import { FormControl, FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";

interface Props {
    mode: "satish" | "icare";

    rentTypes: string[];
    setRentTypes: (v: string[]) => void;

    rooms: string[];
    setRooms: (v: string[]) => void;

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

export default function NewOldFilters({
                                          mode,
                                          rentTypes,
                                          setRentTypes,
                                          rooms,
                                          setRooms,
                                          floorPosition,
                                          setFloorPosition,
                                          selectedRegion,
                                          setSelectedRegion,
                                          selectedRegionItems,
                                          setSelectedRegionItems,
                                          tempSelectedItems,
                                          setTempSelectedItems,
                                          openModal,
                                      }: Props) {


    const handleFloorCheckboxChange = (
        key: keyof FloorPosition,
        exclusiveTopOnly?: boolean
    ) => {
        const newValue = !floorPosition[key];

        if (key === "onlyTop") {
            if (newValue) {
                setFloorPosition({
                    firstNot: false,
                    topNot: false,
                    onlyTop: true,
                });
            } else {
                setFloorPosition({
                    ...floorPosition,
                    onlyTop: false,
                });
            }
            return;
        }

        // firstNot və ya topNot dəyişir
        setFloorPosition({
            ...floorPosition,
            [key]: newValue,
            ...(exclusiveTopOnly
                ? {
                    onlyTop: newValue ? false : floorPosition.onlyTop,
                }
                : {}),
        });
    };

    const [repairLevel, setRepairLevel] = React.useState("Təmirli");


    return (
        <div className="md:grid grid-cols-3 gap-6 mt-6">
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

                {/* İcarə növü */}
                {mode === "icare" && (
                    <ToggleButtonGroup
                        label="İcarə növü"
                        options={["Aylıq", "Günlük"]}
                        value={rentTypes}
                        onChange={setRentTypes}
                    />
                )}

                {/* Kreditlə satış – yalnız satışda */}
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
                {/* Mərtəbə */}
                <NumberRangeField
                    label="Mərtəbə"
                    minWidth={96}
                    maxWidth={96}
                />

                {/* Mərtəbə sayı */}
                <NumberRangeField
                    label="Mərtəbə sayı"
                    minWidth={96}
                    maxWidth={96}
                />

                {/* Mərtəbə yerləşməsi */}
                <div>
                    <FormControl component="fieldset" sx={{ width: "100%", marginTop:"14px" }}>
                        <FormLabel sx={{ fontSize: 12, color: "#555", fontWeight: 600 }}>
                            Mərtəbə yerləşməsi
                        </FormLabel>

                        <FormGroup sx={{ mt: 1 }}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={floorPosition.firstNot}
                                        onChange={() =>
                                            handleFloorCheckboxChange("firstNot", true /* exclusiveTopOnly */)
                                        }
                                    />
                                }
                                label="1-ci olmasın"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={floorPosition.topNot}
                                        onChange={() =>
                                            handleFloorCheckboxChange("topNot", true /* exclusiveTopOnly */)
                                        }
                                    />
                                }
                                label="Ən üst olmasın"
                            />

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={floorPosition.onlyTop}
                                        onChange={() => handleFloorCheckboxChange("onlyTop")}
                                    />
                                }
                                label="Yalnız ən üst"
                            />
                        </FormGroup>
                    </FormControl>
                </div>

                {/* Təmir səviyyəsi */}
                <RepairLevelToggle value={repairLevel} onChange={setRepairLevel} />

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
