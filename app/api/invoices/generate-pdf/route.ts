// app/api/invoices/generate-pdf/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { authenticateRequest } from "@/lib/auth";

/**
 * Generate PDF invoice
 * In production, use pdfkit or similar library
 */
export async function GET(req: NextRequest) {
  try {
    const user = await authenticateRequest(req);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const invoiceId = searchParams.get("id");

    if (!invoiceId) {
      return NextResponse.json(
        { error: "Invoice ID required" },
        { status: 400 }
      );
    }

    // Fetch invoice with details
    const invoice = await prisma.invoice.findUnique({
      where: { id: invoiceId },
      include: {
        client: true,
        project: true,
        lineItems: true,
      },
    });

    if (!invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Generate HTML content (in production, use HTML-to-PDF library)
    const htmlContent = generateInvoiceHTML(invoice);

    // Return HTML as response (in production, convert to PDF)
    return new NextResponse(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Content-Disposition": `attachment; filename="invoice-${invoice.invoiceNumber}.html"`,
      },
    });
  } catch (error) {
    console.error("Invoice generation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

function generateInvoiceHTML(invoice: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .logo { font-size: 24px; font-weight: bold; color: #0052FF; }
        .invoice-number { text-align: right; }
        .invoice-number h1 { margin: 0; font-size: 28px; }
        .invoice-number p { margin: 5px 0; color: #666; }
        .details { display: flex; justify-content: space-between; margin-bottom: 40px; }
        .company-info, .bill-to { flex: 1; }
        .company-info h3, .bill-to h3 { margin: 0 0 10px 0; }
        .company-info p, .bill-to p { margin: 5px 0; color: #666; font-size: 14px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
        th { background: #f5f5f5; padding: 12px; text-align: left; font-weight: bold; border-bottom: 2px solid #0052FF; }
        td { padding: 12px; border-bottom: 1px solid #eee; }
        .amount { text-align: right; }
        .summary { display: flex; justify-content: flex-end; margin-bottom: 30px; }
        .summary-box { width: 300px; }
        .summary-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .summary-row.total { border-bottom: 2px solid #0052FF; font-weight: bold; font-size: 18px; }
        .footer { text-align: center; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">Starlight Labs</div>
          <div class="invoice-number">
            <h1>INVOICE</h1>
            <p>#${invoice.invoiceNumber}</p>
            <p>Date: ${new Date(invoice.issueDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div class="details">
          <div class="company-info">
            <h3>From</h3>
            <p><strong>Starlight Labs</strong></p>
            <p>support@starlabs.dev</p>
            <p>+1 (555) 000-0000</p>
          </div>
          <div class="bill-to">
            <h3>Bill To</h3>
            <p><strong>${invoice.client.name}</strong></p>
            <p>${invoice.client.contactEmail || ""}</p>
            <p>${invoice.client.website || ""}</p>
          </div>
        </div>

        <div style="margin-bottom: 20px;">
          <h3>${invoice.project?.name || "Services"}</h3>
          <p style="color: #666;">${invoice.description || ""}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th class="amount">Quantity</th>
              <th class="amount">Unit Price</th>
              <th class="amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${invoice.lineItems
              .map(
                (item: any) => `
              <tr>
                <td>${item.description}</td>
                <td class="amount">${item.quantity}</td>
                <td class="amount">$${(item.unitPrice / 100).toFixed(2)}</td>
                <td class="amount">$${(item.amount / 100).toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>

        <div class="summary">
          <div class="summary-box">
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>$${(invoice.totalAmount / 100).toFixed(2)}</span>
            </div>
            <div class="summary-row">
              <span>Tax (0%):</span>
              <span>$0.00</span>
            </div>
            <div class="summary-row total">
              <span>Total Due:</span>
              <span>$${(invoice.totalAmount / 100).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div style="background: #f5f5f5; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
          <h4 style="margin-top: 0;">Payment Terms</h4>
          <p>Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}</p>
          <p>
            Payment Method: Bank Transfer<br>
            Status: <strong>${invoice.status}</strong>
          </p>
        </div>

        <div class="footer">
          <p>Thank you for your business!</p>
          <p>© 2024 Starlight Labs. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
