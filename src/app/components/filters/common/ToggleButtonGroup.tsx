"use client";

import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroupMui from "@mui/material/ToggleButtonGroup";

interface ToggleButtonGroupProps {
    label: string;
    options: string[];
    value: string[];
    onChange: (next: string[]) => void;
}

export const ToggleButtonGroup: React.FC<ToggleButtonGroupProps> = ({
                                                                        label,
                                                                        options,
                                                                        value,
                                                                        onChange,
                                                                    }) => {
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newValues: string[]
    ) => {
        if (newValues) onChange(newValues);
    };

    return (
        <div>
            <label className="text-[12px] block  text-gray-600 font-semibold">
                {label}
            </label>

            <ToggleButtonGroupMui
                value={value}
                onChange={handleChange}
                exclusive={false}
                className="mt-2 flex w-full"
            >
                {options.map((opt) => (
                    <ToggleButton
                        key={opt}
                        value={opt}
                        sx={{
                            textTransform: "none",
                            padding:"0",
                            width:"100%",
                            height:"52px",
                            "&.Mui-selected": {
                                backgroundColor: "#facc15",
                                color: "#fff",
                                borderColor: "#eab308",
                                "&:hover": {
                                    backgroundColor: "#fef9c3", // hover yellow-100
                                    color:"rgba(0, 0, 0, 0.54)"
                                },
                            },
                            "&:hover": {
                                backgroundColor: "#fef9c3", // hover yellow-100
                            },
                        }}
                    >
                        {opt}
                    </ToggleButton>
                ))}
            </ToggleButtonGroupMui>
        </div>
    );
};
