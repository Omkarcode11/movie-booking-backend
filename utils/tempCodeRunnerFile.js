function happyNumber(n){

    n =  String(n)
    let sq = 0
    while(n!="4"){
   for(let i = 0 ;i<n.length;i++){
      sq += n[i]**2
   }
   if(sq=="1")return true
   n = String(sq)
   sq= 0
   }
    return false;
}


happyNumber(19)