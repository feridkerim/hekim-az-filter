"use client";

import React from "react";

const TYPES = [
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
];

interface TypeSelectProps {
    value: string;
    onChange: (v: string) => void;
}

export default function TypeSelect({ value, onChange }: TypeSelectProps) {
    return (
        <select
            className="border p-2 rounded-md w-full text-sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {TYPES.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
            ))}
        </select>
    );
}
