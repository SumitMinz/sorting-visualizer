import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
export default function Form({formLabel, values, currentValue, labels, onChange}) {
    return (
        <div className="card container-small" style={{backgroundColor: '#bebebe', padding: '1em 1em'}}>
            <FormControl>
                <FormLabel>{formLabel}</FormLabel>
                <RadioGroup value={currentValue} onChange={onChange}>
                    {values.map((value,index)=>(
                        <FormControlLabel 
                            key={`${value}_${index}`} 
                            value={value}
                            control={<Radio />}
                            label={labels[index]}
                        />
                    ))}
                </RadioGroup>
            </FormControl>
        </div>
    )
}