import { parse } from "@vanillaes/csv"



const parsed =  parse(`
"header1,header2,header3"
"aaa,bbb,ccc"
"zzz,yyy,xxx"
`
)

console.log(parsed)