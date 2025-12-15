"use client";

import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const PROPERTY_TYPES = [
    "Yeni tikili",
    "Köhnə tikili",
    "Həyət evi",
    "Villa",
    "Bağ evi",
    "Ofis",
    "Qaraj",
    "Torpaq",
    "Obyekt",
    "İstirahət mərkəzləri",
] as const;

interface TypeSelectProps {
    value: string;
    onChange: (v: string) => void;
}

export default function TypeSelect({ value, onChange }: TypeSelectProps) {
    return (
        <FormControl fullWidth>
            <InputLabel id="property-type-label">Tikilinin növü</InputLabel>

            <Select
                labelId="property-type-label"
                id="property-type"
                label="Tikilinin növü"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            >
                {PROPERTY_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                        {type}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
