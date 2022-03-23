interface Prop {
  register: (data: any) => any
}

const user: Prop = {} as any

user.register = async (data: any) => {
  try {
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

export default user
