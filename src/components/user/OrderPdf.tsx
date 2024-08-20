
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { CartItem } from '../../Types/allType';


interface InvoiceProps {
    date: string;
    invoiceNumber: string;
    billTo: {
        name: string;
        address: string;
        email: string;
    };
    products: CartItem[];
    subtotal: string;
    tax: string;
    total: string;
}

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
    },
    companyInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    companyName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#374151',
    },
    invoiceInfo: {
        textAlign: 'right',
        color: '#374151',
    },
    invoiceTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 24,
        borderBottom: '1px solid #D1D5DB',
        paddingBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sectionContent: {
        color: '#374151',
    },
    table: {
        marginBottom: 24,
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottom: '1px solid #D1D5DB',
        paddingBottom: 8,
    },
    tableHeaderText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#374151',
        flex: 1,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 8,
    },
    tableCell: {
        fontSize: 12,
        color: '#374151',
        flex: 1,
    },
    footer: {
        marginTop: 24,
        borderTop: '1px solid #D1D5DB',
        paddingTop: 16,
        color: '#374151',
        textAlign: 'center',
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
});

const OrderPdf: React.FC<InvoiceProps> = ({
    date,
    invoiceNumber,
    billTo,
    products,
    subtotal,
    tax,
    total,
}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <View style={styles.companyInfo}>
                    <Text style={styles.companyName}>Netstratum Fashions</Text>
                </View>
                <View style={styles.invoiceInfo}>
                    <Text style={styles.invoiceTitle}>INVOICE</Text>
                    <Text style={styles.sectionContent}>Date: {date}</Text>
                    <Text style={styles.sectionContent}>Invoice #: {invoiceNumber}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Bill To:</Text>
                <Text style={styles.sectionContent}>{billTo.name}</Text>
                <Text style={styles.sectionContent}>{billTo.address}</Text>
                <Text style={styles.sectionContent}>{billTo.email}</Text>
            </View>

            <View style={styles.table}>
                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Description</Text>
                    <Text style={styles.tableHeaderText}>Quantity</Text>
                    <Text style={styles.tableHeaderText}>Price</Text>
                    <Text style={styles.tableHeaderText}>Total</Text>
                </View>
                {products.map((product, index) => (
                    <View style={styles.tableRow} key={index}>
                        <Text style={styles.tableCell}>{product.title}</Text>
                        <Text style={styles.tableCell}>{product.quantity}</Text>
                        <Text style={styles.tableCell}>${product.price}</Text>
                        <Text style={styles.tableCell}>${product.price * product.quantity}</Text>
                    </View>
                ))}
            </View>

            <View style={styles.section}>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Subtotal:</Text>
                    <Text style={styles.tableCell}>${subtotal}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Tax 10%:</Text>
                    <Text style={styles.tableCell}>${tax}</Text>
                </View>
                <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>Total:</Text>
                    <Text style={[styles.tableCell, styles.totalText]}>${total}</Text>
                </View>
            </View>

            <View style={styles.footer}>
                
                <Text>Thank You</Text>
            </View>
        </Page>
    </Document>
);

export default OrderPdf;

