interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`border rounded-lg p-3 w-full ${className}`}
    />
  )
}

