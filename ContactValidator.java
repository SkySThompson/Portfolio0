public class ContactValidator {
    public static boolean validateEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@(.+)$";
        return email.matches(regex);
    }

    public static String validateForm(String name, String email, String message) {
        if (name == null || name.trim().isEmpty()) return "Name is required";
        if (email == null || !validateEmail(email)) return "Valid email is required";
        if (message == null || message.trim().isEmpty()) return "Message is required";
        if (message.length() > 500) return "Message must be under 500 characters";
        return "Valid";
    }

    public static void main(String[] args) {
        System.out.println(validateForm("John", "john@example.com", "Hello")); // Valid
        System.out.println(validateForm("", "invalid", "Hi")); // Name is required
    }
}