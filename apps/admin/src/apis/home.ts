import { request } from '@vben/request'
import {ErrorMessageMode} from "@vben/types";


export interface device_online{
    online:number,
    max:number
}

export interface EntryData{
    "device_online":device_online,
}

export function api_entry(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<EntryData>(
        {
            url: '/entry',
        },
        {
            errorMessageMode: mode,
        },
    )
}