from django.core.management.base import BaseCommand
from core.models import Brand, Collaboration
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = "Seeds mock data for Brands and Collaborations"

    def handle(self, *args, **kwargs):
        Brand.objects.all().delete()
        Collaboration.objects.all().delete()

        categories = ['Travel', 'Fashion', 'Food', 'Tech', 'Fitness']
        platforms = ['instagram', 'youtube', 'both', 'other']
        collab_types = ['barter', 'paid', 'gifting', 'affiliate']
        statuses = ['contacted', 'no_reply', 'in_talks', 'confirmed', 'delivered', 'paid']
        barter_items = ['Travel Backpack', 'Shoes', 'Wireless Earbuds', 'Cotton T-shirt', 'Sunglasses']
        deliverables_list = ['1 Reel', '1 Story', '1 Reel + 1 Story', 'YouTube Video', '3 Stories + Link']

        brands = []
        for i in range(10):
            brand = Brand.objects.create(
                name=f"Brand {i+1} - {random.choice(categories)}",
                website=f"https://brand{i+1}.com",
                instagram_handle=f"@brand{i+1}",
                email=f"contact@brand{i+1}.com",
                phone=f"+91-98765{i:05}",
                category=random.choice(categories)
            )
            brands.append(brand)

        for i in range(50):
            brand = random.choice(brands)
            collab_type = random.choices(collab_types, weights=[0.3, 0.4, 0.2, 0.1])[0]
            status = random.choices(statuses, weights=[0.2, 0.1, 0.15, 0.2, 0.2, 0.15])[0]

            pitch_days_ago = random.randint(5, 60)
            followup_days_ago = random.randint(0, pitch_days_ago - 1)
            deadline_in_days = random.randint(-10, 30)

            is_barter = collab_type == "barter"
            is_paid = collab_type == "paid"

            Collaboration.objects.create(
                brand=brand,
                campaign_name=f"Campaign {i+1}",
                platform=random.choice(platforms),
                collab_type=collab_type,
                status=status,
                pitch_date=date.today() - timedelta(days=pitch_days_ago),
                followup_date=date.today() - timedelta(days=followup_days_ago),
                delivery_deadline=date.today() + timedelta(days=deadline_in_days),
                deliverables=random.choice(deliverables_list),
                notes=random.choice([
                    "Discussed with brand rep.",
                    "Pending final approval.",
                    "Waiting for shipment.",
                    "Invoice sent.",
                    ""
                ]),
                amount=random.uniform(1500, 15000) if is_paid else None,
                barter_product=random.choice(barter_items) if is_barter else None,
                barter_value=random.uniform(500, 5000) if is_barter else None,
            )

        self.stdout.write(self.style.SUCCESS("Seeded 10 brands and 50 collaborations!"))
