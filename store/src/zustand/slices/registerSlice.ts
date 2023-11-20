import { StateCreator } from "zustand"
import { Slices } from "../store"
import { LoginInfoPayload, LoginResponse, PersonalInfoPayload, Register, RegisterError } from "../types"
import { httpClient } from "../api/httpClient"
import { localStorageKeys } from "../../config/localStorageKeys"

interface CheckResponse {
    field: string
    alreadyExists: boolean
}

export interface RegisterSlice {
    registerData: Register
    setPersonalInfo: (payload: PersonalInfoPayload) => Promise<RegisterError[]>
    getPersonalInfo: () => PersonalInfoPayload
    setLoginInfo: (payload: LoginInfoPayload) => Promise<RegisterError[]>
    getLoginInfo: () => LoginInfoPayload
    checkMail: (email: string) => Promise<boolean>
    checkDocument: (document: string) => Promise<boolean>
    register: () => Promise<LoginResponse>
}

const createRegisterSlice: StateCreator<
    Slices,
    [],
    [],
    RegisterSlice
> = (set, slices) => {
    return {
        registerData: {
            name: '',
            document: '',
            email: '',
            password: '',
            birth_date: '',
            genderId: '',
        },
        setPersonalInfo: async (payload: PersonalInfoPayload): Promise<RegisterError[]> => {
            slices().registerApi.registerData = {
                ...slices().registerApi.registerData,
                ...payload
            }

            const alreadyExists = await slices().registerApi.checkDocument(payload.document)
            if (alreadyExists) {
                return [{
                    field: 'document',
                    message: 'Documento já cadastrado'
                }]
            }

            return []
        },
        getPersonalInfo: (): PersonalInfoPayload => {
            return {
                name: slices().registerApi.registerData.name,
                document: slices().registerApi.registerData.document,
                birth_date: slices().registerApi.registerData.birth_date,
                genderId: slices().registerApi.registerData.genderId,
            }
        },
        setLoginInfo: async (payload: LoginInfoPayload): Promise<RegisterError[]> => {
            slices().registerApi.registerData = {
                ...slices().registerApi.registerData,
                ...payload
            }

            const alreadyExists = await slices().registerApi.checkMail(payload.email)
            if (alreadyExists) {
                return [{
                    field: 'email',
                    message: 'E-mail já cadastrado'
                }]
            }

            return []
        },
        getLoginInfo: (): LoginInfoPayload => {
            return {
                email: slices().registerApi.registerData.email,
                password: slices().registerApi.registerData.password,
            }
        },
        checkMail: async (email: string): Promise<boolean> => {
            const { data } = await httpClient.post<CheckResponse[]>(`/client/check`, { email })
            return data.filter((e) => e.field === 'email')[0]?.alreadyExists
        },
        checkDocument: async (document: string): Promise<boolean> => {
            const { data } = await httpClient.post<CheckResponse[]>(`/client/check`, { document })
            return data.filter((e) => e.field === 'document')[0]?.alreadyExists
        },
        register: async (): Promise<LoginResponse> => {
            try {
                const payload = slices().registerApi.registerData;
                const { data } = await httpClient.post<LoginResponse>('/client/register', payload)
                if (data?.access_token) {
                    localStorage.setItem(
                        localStorageKeys.ACCESS_TOKEN,
                        data?.access_token,
                    )

                    slices().authApi.isLoggedIn = true
                }

                return data
            } catch (error) {
                console.log({ error });
                throw error
            }
        },
    }
}

export default createRegisterSlice