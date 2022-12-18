import {handleChangeTest} from './index';

describe('funciones dentro de login',()=>{

        test('retorna false si es un email invalido o vacio',()=>{
            let fakeData = {target:{name:'username',value:'lightcaceres'}};
            expect(handleChangeTest(fakeData)).toBeFalsy();
        })
})