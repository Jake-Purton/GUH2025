import json

# Input and output file paths
input_file = "languages-by-country-2025.json"
output_file = "correct-languages-by-country-2025.json"

# Step 1: Read the JSON data from a file
with open(input_file, "r", encoding="utf-8") as f:
    data = json.load(f)

# Step 2: Transform list into a dictionary keyed by flagCode
result = {
    item["flagCode"]: {k: v for k, v in item.items() if k != "flagCode"}
    for item in data
}

# Step 3: Write the transformed data to a new JSON file
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(result, f, indent=2, ensure_ascii=False)

print(f"Transformed data written to {output_file}")
