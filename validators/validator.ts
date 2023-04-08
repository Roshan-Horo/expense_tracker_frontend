import validate, { ValidationError } from 'jsonschema'
import { SIGNUP_USER, LOGIN_USER} from '../constants/validatorConstants'

// Schema validators
import { signUpUserSchema , loginUserSchema, addressSchema, documentsSchema, cardHolderSchema, confirmOtpSchema, orgSchema, adminSchema, customerSchema, updateAddressSchema} from './requestSchema';

const Validator = validate.Validator;
let v = new Validator();

v.addSchema(addressSchema, '/SimpleAddress')
v.addSchema(orgSchema, '/SimpleOrg')
v.addSchema(adminSchema, '/SimpleAdmin')
v.addSchema(documentsSchema, '/SimpleDocuments')

type reqType = {
  type: string,
  validateData: {}
}

type resultResType = {
  status: boolean,
  msg: string,
  error?: ValidationError[]
}

// check validation result and crete response object
function createResultObj(validationResult: validate.ValidatorResult): resultResType {
  if(validationResult.errors.length > 0){

    console.log(`Total ${validationResult.errors.length} Errors`)
  
    validationResult.errors?.map(( err, index) => {
      console.log(`Error ${index + 1} : ${err}`)
    })
  
    return {
      status: false,
      msg: 'Invalid',
      error: validationResult.errors
    };
  }else{
    return {
      status: true,
      msg: 'Request Object Validated successfully'
    };
  }
}


export const validateRequest = ({ type, validateData} : reqType): resultResType => {

  switch(type){
    case SIGNUP_USER: return createResultObj(v.validate(validateData, signUpUserSchema));

    case LOGIN_USER: return createResultObj(v.validate(validateData, loginUserSchema));

    default: return {
      status: false,
      msg: 'Request Type Not Matched'
    }
  }

}