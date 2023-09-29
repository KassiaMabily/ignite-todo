import { AxiosError } from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getErrors(err: AxiosError): string[] {
  let errors: string[] = [ err.message ]

  if(err.response?.data) {
    const data: any = err.response.data

    if( typeof data === "object" && "errors" in data) {
      errors = typeof data["errors"] === "object" ? data["errors"] : [data["errors"]];
    }else{
      errors = [ data ]
    }
  }

  return errors
}
