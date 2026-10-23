import os
import fitz

pdf_dir = "protected-files/pdfs"
out_dir = "public/covers"
os.makedirs(out_dir, exist_ok=True)

files = [
    ("beginner_home_workout-2026.pdf", "beginner-home-workout-cover.png"),
    ("The Master_Meal_Planning_Guide-2026.pdf", "master-meal-planning-cover.png"),
    ("Cortisol_&_Stress_Management-2026.pdf", "cortisol-stress-management-cover.png"),
    ("Hypertrophy-Strength-Protocol-2026.pdf", "hypertrophy-strength-cover.png"),
    ("Daily_Mobility_and_Recovery-2026.pdf", "daily-mobility-recovery-cover.png"),
    ("Fat-Loss-Nutrition-Blueprint-2026.pdf", "fat-loss-nutrition-cover.png"),
    ("High_Protein_Recipe_Collection-2026.pdf", "high-protein-recipe-cover.png"),
    ("Deep_Sleep_Optimization-2026.pdf", "deep-sleep-optimization-cover.png"),
    ("Mindfulness_and_Habit_Reset_Workbook-2026.pdf", "mindfulness-habit-reset-cover.png"),
    ("the-next-level-lifespan.pdf", "the-next-level-lifespan-cover.png")
]

for pdf_name, out_name in files:
    pdf_path = os.path.join(pdf_dir, pdf_name)
    if not os.path.exists(pdf_path):
        print(f"Skipping {pdf_name}, not found")
        continue
    
    doc = fitz.open(pdf_path)
    page = doc.load_page(0) # First page (cover)
    pix = page.get_pixmap(dpi=150)
    out_path = os.path.join(out_dir, out_name)
    pix.save(out_path)
    print(f"Extracted cover from {pdf_name} -> {out_path} ({pix.width}x{pix.height})")
