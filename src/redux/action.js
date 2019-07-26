export const USER_FIRST_NAME = 'USER_FIRST_NAME';
export const USER_LAST_NAME = 'USER_LAST_NAME';
export const USER_EMAIL = 'USER_EMAIL';
export const USER_PASSWORD = 'USER_PASSWORD'

export const userFirstName = firstName => ({
    type: USER_FIRST_NAME,
    payload: firstName
})

export const userLastName = lastName => ({
    type: USER_LAST_NAME,
    payload: lastName
})

export const userEmail = email => ({
    type: USER_EMAIL,
    payload: email
})

export const userPassword = password => ({
    type: USER_PASSWORD,
    payload: password
})