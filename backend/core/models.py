from django.db import models

class Brand(models.Model):
    name = models.CharField(max_length=255)
    website = models.URLField(blank=True, null=True)
    instagram_handle = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, null=True)  # e.g., Travel, Fashion, Food

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Collaboration(models.Model):
    PLATFORM_CHOICES = [
        ('instagram', 'Instagram'),
        ('youtube', 'YouTube'),
        ('both', 'Both'),
        ('other', 'Other'),
    ]

    TYPE_CHOICES = [
        ('barter', 'Barter'),
        ('paid', 'Paid'),
        ('gifting', 'Gifting'),
        ('affiliate', 'Affiliate'),
    ]

    STATUS_CHOICES = [
        ('contacted', 'Contacted'),
        ('no_reply', 'No Reply'),
        ('in_talks', 'In Talks'),
        ('confirmed', 'Confirmed'),
        ('delivered', 'Delivered'),
        ('paid', 'Paid'),
    ]

    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='collaborations')
    campaign_name = models.CharField(max_length=255, blank=True, null=True)
    platform = models.CharField(max_length=20, choices=PLATFORM_CHOICES)
    collab_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='contacted')

    pitch_date = models.DateField(blank=True, null=True)
    followup_date = models.DateField(blank=True, null=True)
    delivery_deadline = models.DateField(blank=True, null=True)

    # Calendar-specific fields
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    payment_due_date = models.DateField(blank=True, null=True)
    payment_received_date = models.DateField(blank=True, null=True)
    reminder_date = models.DateField(blank=True, null=True)

    deliverables = models.TextField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    barter_product = models.CharField(max_length=255, blank=True, null=True)
    barter_value = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        brand = self.brand.name
        campaign = self.campaign_name or "No Campaign"
        collab_type = self.collab_type.capitalize()
        status = self.status.replace("_", " ").title()
        return f"{brand} | {campaign} | {collab_type} [{status}]"
