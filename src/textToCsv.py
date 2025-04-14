import csv

# file paths 
input_file = 'quizlet_export.txt'
output_file = 'flashcards.csv'

def convert_to_csv(input_file, output_file, delimeter=','):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines() # read eachline in the text file
    
    # prepare data for CSV
    flashcards = []
    for line in lines:
        # split by delimiter
        parts = line.strip().split(delimeter)
        # if len(parts) == 2:
        term = parts[0]
        definition = parts[1]
            # term, definition = parts
        flashcards.append([term, definition])
        # else:
           # print(f"Warning: Skipping line with unexpected format: {line}")

    # Write to CSV
    with open(output_file, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(['Term', 'Definition']) # Header Row
        writer.writerows(flashcards)

    print(f"Successfully saved to {output_file}")

# Run the conversion function 
convert_to_csv(input_file, output_file)
