//import { HttpHeaders } from '@angular/common/http';
import { Constants } from '../common/constants';

/*export let contentHeaders = new HttpHeaders();
contentHeaders = contentHeaders.append('content-type','application/x-www-form-urlencoded');
//contentHeaders.append('accept','application/json');
contentHeaders = contentHeaders.append('Cache-Control','no-cache');
//contentHeaders.append('Access-Control-Allow-Origin', '*');
if (localStorage.getItem('pw_checksum')) {
    contentHeaders = contentHeaders.append('checksum',localStorage.getItem('pw_checksum'));
    contentHeaders = contentHeaders.append('userid',localStorage.getItem('pw_id'));
    contentHeaders = contentHeaders.append('role',localStorage.getItem('pw_role'));
    contentHeaders = contentHeaders.append('compid',localStorage.getItem('pw_compid'));
}*/

/*export let headers = new HttpHeaders();
headers=headers.append('content-type','application/json')
headers=headers.append('Access-Control-Allow-Origin', '*')
headers=headers.append('content-type','application/x-www-form-urlencoded');*/

export const contentHeaders = { 'Content-Type' : 'application/json',
'compid':localStorage.getItem('pw_compid'), 
'checksum':localStorage.getItem('pw_checksum'), 
'userid':localStorage.getItem('pw_id'), 
'role':localStorage.getItem('pw_role'),
'type': Constants.ADMIN_API_ACCESS_TYPE
};


