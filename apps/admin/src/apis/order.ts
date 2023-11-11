import {request} from '@vben/request'
import {ErrorMessageMode} from "@vben/types";

export interface order_type {

}


export function api_types(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<order_type[]>(
        {
            url: '/order/types',
        },
        {
            errorMessageMode: mode,
        },
    )
}

export async function api_levels(
    mode: ErrorMessageMode = 'modal',
) {
    return request.get<order_type[]>(
        {
            url: '/order/levels',
        },
        {
            errorMessageMode: mode,
        },
    )
}