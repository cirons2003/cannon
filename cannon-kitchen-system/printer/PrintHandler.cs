using StarMicronics.StarIO;
using StarMicronics.StarIOExtension;

public class PrintHandler
{
    private readonly string portName;
    private readonly ILogger<PrintHandler> logger;
    private readonly string portSettings;
    public PrintHandler(ILogger<PrintHandler> logger)
    {
        portName = "TCP:192.168.1.151";
        this.logger = logger;
        portSettings = "";
    }

    public void printOrders()
    {
        IPort? port = null;
        try
        {
            port = Factory.I.GetPort(portName, portSettings, 10000);
            StarPrinterStatus status = port.BeginCheckedBlock();
            if (status.Offline)
            {
                logger.LogWarning("Printer at {PortName} is offline.", portName);
                throw new PortException("Port " + this.portName + "is offline");
            }

            ICommandBuilder builder = StarIoExt.CreateCommandBuilder(Emulation.StarGraphic);
            builder.AppendInitialization(InitializationType.Command);
            builder.Append(System.Text.Encoding.ASCII.GetBytes("\nHello, World!\n"));
            builder.AppendLineFeed(3);

            byte[] command = builder.Commands;
            uint receivedLength = port.WritePort(command, 0, (uint)command.Length);

            status = port.EndCheckedBlock();
            if (status.Offline)
            {
                logger.LogWarning("Failed to communicate with port {PortName} after writing.", portName);
                throw new PortException("Failed to communicate with port " + this.portName);
            }
            logger.LogInformation("Print orders completed successfully.");
        }
        catch (PortException exception)
        {
            logger.LogError(exception, "Failed to print orders due to port exception.");
            throw new PortException(exception.Message);
        }
        finally
        {
            Factory.I.ReleasePort(port);
            logger.LogInformation("Port {PortName} released.", portName);
        }
    }
}