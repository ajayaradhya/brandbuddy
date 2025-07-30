from django.core.management.base import BaseCommand
from core.models import Brand, Collaboration
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = "Seeds mock data for Brands and Collaborations with realistic campaigns"

    def handle(self, *args, **kwargs):
        Brand.objects.all().delete()
        Collaboration.objects.all().delete()

        platforms = ['instagram', 'youtube', 'both', 'other']
        collab_types = ['barter', 'paid', 'gifting', 'affiliate']
        statuses = ['contacted', 'no_reply', 'in_talks', 'confirmed', 'delivered', 'paid']
        barter_items = ['Travel Backpack', 'Shoes', 'Wireless Earbuds', 'Cotton T-shirt', 'Sunglasses']
        deliverables_list = ['1 Reel', '1 Story', '1 Reel + 1 Story', 'YouTube Video', '3 Stories + Link']
        real_brands = [
            ("Airbnb", "Travel"),
            ("MakeMyTrip", "Travel"),
            ("GoPro", "Tech"),
            ("Decathlon", "Fitness"),
            ("The Hosteller", "Travel"),
            ("Zostel", "Travel"),
            ("Wildcraft", "Fashion"),
            ("Columbia Sportswear", "Fashion"),
            ("Boat", "Tech"),
            ("Taj Hotels", "Travel"),
            ("Club Mahindra", "Travel"),
            ("Lenskart", "Fashion"),
            ("TrawellTag", "Travel"),
            ("Thomas Cook", "Travel"),
            ("Cleartrip", "Travel"),
        ]

        def realistic_note(brand, collab_type):
            templates = [
                f"Discussed deliverables with {brand}. Awaiting sample approval.",
                f"{brand} is reviewing past work before confirming the {collab_type} deal.",
                f"Sent pitch deck to {brand}. Waiting for feedback.",
                f"Final edit shared with {brand} for review.",
                f"Barter item shipped by {brand}. Tracking ID received.",
                f"{brand} requested campaign timeline and estimated reach.",
                f"Invoice sent. Awaiting payment from {brand}.",
                f"{brand} confirmed campaign launch for next week.",
                f"Call scheduled with {brand}'s marketing team.",
                f"Received positive response. Contract from {brand} awaited.",
            ]
            return random.choice(templates)

        def random_date_in_year():
            start_date = date.today() - timedelta(days=180)
            end_date = date.today() + timedelta(days=180)
            return start_date + timedelta(days=random.randint(0, (end_date - start_date).days))

        # Create Brands
        brands = []
        for name, category in real_brands:
            brand = Brand.objects.create(
                name=name,
                website=f"https://{name.lower().replace(' ', '')}.com",
                instagram_handle=f"@{name.lower().replace(' ', '')}",
                email=f"hello@{name.lower().replace(' ', '')}.com",
                phone=f"+91-98765{random.randint(10000, 99999)}",
                category=category
            )
            brands.append(brand)

        # Create 80-100 realistic collaborations
        for i in range(100):
            brand = random.choice(brands)
            collab_type = random.choices(collab_types, weights=[0.3, 0.4, 0.2, 0.1])[0]
            is_barter = collab_type == "barter"
            is_paid = collab_type == "paid"

            pitch_date = random_date_in_year()
            followup_date = pitch_date + timedelta(days=random.randint(1, 4))
            delivery_deadline = followup_date + timedelta(days=random.randint(5, 30))

            Collaboration.objects.create(
                brand=brand,
                campaign_name=f"{brand.name} Campaign {i+1}",
                platform=random.choice(platforms),
                collab_type=collab_type,
                status=random.choice(statuses),
                pitch_date=pitch_date,
                followup_date=followup_date,
                delivery_deadline=delivery_deadline,
                start_date=pitch_date,
                end_date=delivery_deadline,
                payment_due_date=delivery_deadline + timedelta(days=10),
                payment_received_date=delivery_deadline + timedelta(days=random.randint(12, 30)) if is_paid else None,
                reminder_date=pitch_date + timedelta(days=2),

                deliverables=random.choice(deliverables_list),
                notes=realistic_note(brand.name, collab_type),
                amount=round(random.uniform(2000, 20000), 2) if is_paid else None,
                barter_product=random.choice(barter_items) if is_barter else None,
                barter_value=round(random.uniform(1000, 7000), 2) if is_barter else None,
            )

        self.stdout.write(self.style.SUCCESS("Seeded 15 brands and 100 realistic collaborations across the year!"))
