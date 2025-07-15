def calculate_bmi(weight_kg, height_cm):
    height_m = height_cm / 100
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 2)

def get_bmi_category(bmi):
    if bmi < 18.5:
        return "Underweight 🪶"
    elif 18.5 <= bmi < 24.9:
        return "Normal weight 💪"
    elif 25 <= bmi < 29.9:
        return "Overweight 🍩"
    else:
        return "Obese 🧸"

def main():
    print("🧮 Welcome to the BMI Calculator 🧮\n")
    
    try:
        weight = float(input("Enter your weight (kg): "))
        height = float(input("Enter your height (cm): "))
        
        if weight <= 0 or height <= 0:
            print("⚠️ Weight and height must be positive numbers.")
            return

        bmi = calculate_bmi(weight, height)
        category = get_bmi_category(bmi)

        print(f"\nYour BMI is: {bmi}")
        print(f"Category: {category}")
    
    except ValueError:
        print("🚫 Invalid input. Please enter numeric values only.")

if __name__ == "__main__":
    main()
