"use client";

import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const REPAIR_LEVELS = ["Təmirli", "Təmirsiz"] as const;

interface RepairLevelToggleProps {
    value: string;
    onChange: (v: string) => void;
}

export default function RepairLevelToggle({
                                              value,
                                              onChange,
                                          }: RepairLevelToggleProps) {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newValue: string | null
    ) => {
        if (newValue !== null) onChange(newValue);
    };

    return (
        <div className="space-y-1 mt-2">
            <label className="text-[12px] block text-gray-600 font-semibold">
                Təmir səviyyəsi
            </label>

            <ToggleButtonGroup
                value={value}
                exclusive
                onChange={handleChange}
                className="mt-1"
            >
                {REPAIR_LEVELS.map((opt) => (
                    <ToggleButton
                        key={opt}
                        value={opt}
                        sx={{
                            textTransform: "none",
                            fontSize: "14px",
                            px: 3,
                            py: 1,
                            border: "1px solid #e5e7eb",
                            color: "#374151",

                            "&:hover": {
                                backgroundColor: "#fef9c3", // hover yellow-100
                            },

                            "&.Mui-selected": {
                                backgroundColor: "#facc15", // yellow-400
                                color: "#fff",
                                borderColor: "#eab308",

                                "&:hover": {
                                    backgroundColor: "#eab308", // yellow-500
                                },
                            },
                        }}
                    >
                        {opt}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </div>
    );
}
