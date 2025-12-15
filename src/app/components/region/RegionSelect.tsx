"use client";

import React, {useMemo} from "react";
import {RAYON_DATA} from "./rayonData";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

const REGION_OPTIONS = ["Bakı", "Sumqayıt", "Abşeron", "Gəncə"];

const METRO_LIST = [
    "28 May",
    "Gənclik",
    "Nərimanov",
    "Nizami",
    "İnşaatçılar",
    "Elmlər Akademiyası",
];

const NISANGAH_LIST = [
    "Gənclik Mall",
    "Tibb Universiteti",
    "ASAN Xidmət 1",
    "DOST Mərkəzi",
];

const MTK_LIST = [
    "Kristal Abşeron",
    "Pilot Layihəsi",
    "Yüksəliş MTK",
    "Mənzil Tikinti Kooperativi",
];

interface Props {
    selectedRegion: string;
    setSelectedRegion: (v: string) => void;

    selectedItems: string[];
    setSelectedItems: (v: string[]) => void;

    openModal: () => void;
}

export default function RegionSelect({
                                         selectedRegion,
                                         setSelectedRegion,
                                         selectedItems,
                                         openModal,
                                     }: Props) {
    const rayonChips = useMemo(() => {
        const result: string[] = [];

        Object.keys(RAYON_DATA).forEach((rayon) => {
            const villages = RAYON_DATA[rayon];
            const rayonSelected = selectedItems.includes(rayon);
            const allVillagesSelected =
                villages.length > 0 &&
                villages.every((v) => selectedItems.includes(v));

            if (villages.length === 0 && !rayonSelected) return;

            if (rayonSelected || allVillagesSelected) {
                result.push(`${rayon} (${villages.length})`);
            } else {
                villages.forEach((v) => {
                    if (selectedItems.includes(v)) {
                        result.push(v);
                    }
                });
            }
        });

        return result;
    }, [selectedItems]);

    const simpleChips = useMemo(
        () =>
            selectedItems.filter(
                (x) =>
                    METRO_LIST.includes(x) ||
                    NISANGAH_LIST.includes(x) ||
                    MTK_LIST.includes(x)
            ),
        [selectedItems]
    );

    const chips = [...rayonChips, ...simpleChips];

    return (
        <div className="space-y-2">
            <Autocomplete
                disablePortal
                options={REGION_OPTIONS}
                value={selectedRegion}
                onChange={(event, newValue) => {
                    if (newValue) setSelectedRegion(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Azərbaycan rayonları"
                        size="small"
                    />
                )}
                sx={{width: "100%", marginTop: "4px"}}
            />

            {selectedRegion === "Bakı" && (
                // <button
                //     type="button"
                //     onClick={openModal}
                //     className="mt-2 px-4 py-2 border rounded-md bg-gray-100 text-sm"
                // >
                //     Rayon, Qəsəbə, Metro, Nişangah, MTK
                // </button >
                <Button
                    type="button"
                    fullWidth
                    onClick={openModal}
                    variant="outlined"
                    size="medium"
                    sx={{
                        textTransform: "none",        // CAPS OFF
                        backgroundColor: "#facc15",   // Custom background (yellow-400)
                        color: "#fff",                // Text color
                        fontSize: "14px",             // Optional
                        fontWeight: 500,
                        borderColor:"#facc15",

                        "&:hover": {
                            backgroundColor: "#eab308",
                            borderColor:"#facc15",// yellow-500
                        },

                        "&:active": {
                            backgroundColor: "#ca8a04",   // yellow-600
                        }
                    }}
                >
                    Rayon, Qəsəbə, Metro, Nişangah, MTK
                </Button>
            )}

            {chips.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {chips.map((item) => (
                        <span
                            key={item}
                            className="bg-yellow-300 px-2 py-1 rounded text-xs border border-yellow-500"
                        >
              {item}
            </span>
                    ))}
                </div>
            )}
        </div>
    );
}
