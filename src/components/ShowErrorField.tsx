import { ShowErrorFieldProps } from "@/app/interface";


function ShowErrorField({ error }: ShowErrorFieldProps) {
  if (!error) return <span className='min-h-5 block text-red-700'></span>;
  return <span className='min-h-5 block text-red-700'>{error}</span>;
}

export default ShowErrorField;