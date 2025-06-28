# STRIPE PRODUCTS SETUP - Run these commands in Stripe CLI
# Updated pricing: Free, .99, .99 +  file processing

# Create Premium Subscription Product (.99/month)
stripe products create --name="Brainstorm Premium" --description="Advanced TCG analytics, unlimited portfolio tracking, real-time alerts"

# Create Premium Price (use product ID from above)
stripe prices create --unit-amount=999 --currency=usd --recurring="interval=month" --product=prod_REPLACE_WITH_PREMIUM_PRODUCT_ID

# Create Enterprise Subscription Product (.99/month)  
stripe products create --name="Brainstorm Enterprise" --description="Professional TCG platform with unlimited features, file processing, API access"

# Create Enterprise Price (use product ID from above)
stripe prices create --unit-amount=1499 --currency=usd --recurring="interval=month" --product=prod_REPLACE_WITH_ENTERPRISE_PRODUCT_ID

# Create TC Investments File Processing Product ( per file)
stripe products create --name="TC Investments File Processing" --description="Professional file processing and analysis service"

# Create File Processing Price (one-time payment)
stripe prices create --unit-amount=5900 --currency=usd --product=prod_REPLACE_WITH_FILE_PROCESSING_PRODUCT_ID

# Create webhook endpoint
stripe webhook_endpoints create --url="https://tcinvestments.net/api/webhooks/stripe" --enabled-events="customer.subscription.created,customer.subscription.updated,customer.subscription.deleted,payment_intent.succeeded"

echo " Stripe products created successfully!"
echo " Update your .env files with the actual price IDs from above"
