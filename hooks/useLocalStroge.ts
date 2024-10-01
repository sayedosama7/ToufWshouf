
export const ClientStorage = {
  
  get(key: any) {

     return localStorage.getItem(key);
  },
  set(key: string, value: string) {
    return localStorage.setItem(key, value);
  },
};

