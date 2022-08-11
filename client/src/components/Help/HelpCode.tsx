import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>('panel1');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Realizar un pedido</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p style={{color:"blue", fontWeight:"900"}}>¿Cómo realizo un pedido?</p>
          Solo tenés que seleccionar todos los productos que deseas adquirir. Seguidamente, en el carrito de compras, para conocer el costo del envío colocás tu código postal en el recuadro correspondiente, elegís la mensajería de tu preferencia y debajo seleccionas la forma de pago. Luego hacés clic en el botón COMPRAR y podés acceder como cliente (si ya tenés cuenta en GameHub) o crear un cliente nuevo. Por último, completás los pasos brindados por el asistente, hasta confirmar la compra. Se te asignará un número de pedido y se mostrarán los datos del mismo. También enviaremos un mail a tu correo electrónico registrado con los detalles del pedido realizado.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Precio</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿El precio que figura en la web es el precio final?</p>
          Todos los precios en la web incluyen el IVA, y se encuentran expresados en pesos argentinos.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Formas de pago</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿Cuáles son las formas de pago? </p>
          Contamos con dos formas de pago: a través de depósito/transferencia bancaria, con la cual obtenés el precio especial, o bien, a través de los métodos Pago Gamer (Visa o MasterCard) o MercadoPago (Tarjetas online, PagoFácil y RapiPago) con los cuales podés abonar en cuotas, al precio de lista.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Mercadopago</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿Cómo puedo abonar a través de MercadoPago?</p>
          Podés hacerlo de tres formas: Con tarjetas online en cuotas (no se puede acceder a cuotas sin interés); A través de RapiPago/ PagoFácil (se abona al precio de lista, pero no se pueden hacer cuotas, sólo se puede abonar en un pago); y realizando una transferencia desde tu cuenta de MercadoPago
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Envíos</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿Cómo gestiono el envío de mi pedido?</p>
          En primer lugar, para conocer el costo del envío, una vez al agregues al carrito tu compra, solo debes colocar tu código postal en el recuadro correspondiente, seleccionar la mensajería de tu preferencia y elegir si deseas el retiro en alguna sucursal o la entrega a domicilio. Actualmente realizamos envíos a todo el país través de Oca y Andreani; y si te encontrás en CABA o alrededores, podrás seleccionar el servicio de Mensajería Privada que es exclusivo de GameHub. Tené en cuenta que, para calcular el costo del envío, se toman en consideración tanto las dimensiones y peso del paquete como la distancia de la localidad de entrega.
          </Typography>
        </AccordionDetails>
      </Accordion><Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Facturación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿Cómo tramito la factura de mi compra?</p>
          En todas las compras efectuadas en la web, brindamos sin excepción alguna, la factura de compra. Una vez que realiza y abona el pedido, enviamos a tu dirección de correo electrónico la factura correspondiente. Por supuesto, también podés descargarla desde la sección Mi cuenta .Mis facturas. En caso de que precises factura A, solo debes ingresar tu CUIT al cargar el pedido por la web. Tené en cuenta que la factura A puede tener percepciones.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Garantías</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿Cómo utilizo el servicio de PosVenta y garantías?</p>
          Para realizar consultas/reclamos relacionadas con la garantía o devolución de alguna de tus compras, al final de esta sección contamos con el apartado “GameHub te ayuda. ¿Cuál es tu consulta?” donde debes exponer tu caso, seleccionando el motivo de “Posventa” que se adapte a tu requerimiento y uno de nuestros representantes te ofrecerá la información correspondiente sobre cómo proceder.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Canjes y promociones</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿Cómo obtengo el juego y/o beneficios de los productos en promoción?</p>
          Todos los canjes de los juegos y/o beneficios se realizan de forma posterior a la entrega del producto y son totalmente digitales. Los canjes se realizan desde ACÁ con los datos de la factura de compra y el mail registrado en la compra. Se toma como fecha válida, para la vigencia de las promociones, el día en que fue creado el pedido y no la fecha de pago, ni la fecha de emisión de la factura. Considerá que, si realizó la compra del producto en promoción, en tiempo y forma pero no puede realizar el canje dentro de la fecha, ello se debe a que no se cuenta con stock de códigos. Así mismo, sepa que la disponibilidad de códigos es limitada, y una vez que se agotan, no será posible realizar el canje.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel9'} onChange={handleChange('panel9')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Gamercoins</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          <p style={{color:"blue", fontWeight:"900"}}>¿Qué son los Gamercoins?</p>
          Es un beneficio que brinda GameHub a sus clientes, premiando sus compras. Se pueden utilizar en descuentos parciales sobre cualquier producto que se encuentre en stock en la web de GameHub 
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}